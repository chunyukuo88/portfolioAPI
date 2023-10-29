import { getSupabaseClient } from '../../common/factory';
import { Article } from '../../common/models/Article';
import { addArticleToDatabase } from '../../createArticle/addArticleToDatabase';
import {
  createNewPage,
  buildNewArticle,
  articleIsInvalid,
} from '../../createArticle/utils';
import 'uuid';

jest.mock('../../common/factory');
jest.mock('uuid', () => ({
  v4: () => 'some unique ID',
}));

afterEach(() => {
  jest.clearAllMocks();
});

const mockUpsert = jest.fn();
const mockUpdate = jest.fn();

describe('addArticleToDatabase()', () => {
  describe('GIVEN: valid blog data,', () => {
    describe('WHEN: the handler is invoked', () => {
      describe('AND: The most recent page has 3 blog entries in it,', () => {
        const mockPages = [
          {
            id: 1,
            created_at: new Date(12),
            count: 3,
            next: 'www.foo.com',
            previous: 'www.bar.com',
            results: [
              { page: 1 },
              { page: 1 },
              { page: 1 },
            ],
          }
        ];
        beforeEach(() => {
          getSupabaseClient.mockImplementationOnce(() => ({
            from: jest.fn(() => ({
              select: jest.fn(() => ({
                order: jest.fn(() => ({
                  data: mockPages,
                })),
              })),
              upsert: mockUpsert,
            })),
          }));
        });
        const title = 'Test title';
        const imageUrl = 'example.com';
        const body = 'This is the body of the article.';
        const page = 2;
        const newBlogArticle = buildNewArticle({title, imageUrl, body}, page);

        const id = 1;
        const created_at = expect.any(Object);
        const count = 1;
        const next = null;
        const previous = `${process.env.GET_ALL_INFINITE}${1}`;
        const results = [newBlogArticle];

        it('THEN: should invoke the ORM method that creates a new page in the database.', async () => {
          await addArticleToDatabase(newBlogArticle);

          expect(mockUpsert).toBeCalledTimes(1);
        });
        it('THEN: should add the non-editable attributes such as articleId, likes, and views', async () => {
          const pageData = { id, created_at, count, next, previous, results };
          const expectedNewPage = createNewPage(pageData, newBlogArticle);

          await addArticleToDatabase(newBlogArticle);

          expect(mockUpsert).toBeCalledWith(expectedNewPage);
        });
        it.skip('THEN: should also update the `next` field of the previous database entry', () => {
          // TODO Compare database rows 4 and 5. Note that database row 4 should have a 'next' field with a URL rather than the current 'null' value.
        });
      });
      describe('AND: The most recent page has 2 blog articles in it,', () => {
        it('THEN: add the blog entry to the most recent page.', async () => {
          const mostRecentPageWithTwoArticles = [
            { page: 1},
            { page: 1},
          ];
          const created_at = new Date().setMilliseconds(0);
          const mockPages = [
            {
              id: 1,
              created_at,
              count: mostRecentPageWithTwoArticles.length,
              next: 'www.foo.com',
              previous: 'www.bar.com',
              results: mostRecentPageWithTwoArticles
            }
          ];
          getSupabaseClient.mockImplementationOnce(() => ({
            from: jest.fn(() => ({
              select: jest.fn(() => ({
                order: jest.fn(() => ({
                  data: mockPages,
                })),
              })),
              upsert: mockUpsert,
              update: mockUpdate,
            })),
          }));

          const title = 'Test title';
          const imageUrl = 'example.com';
          const body = 'This is the body of the article.';
          const page = 1;
          const newBlogArticle = buildNewArticle({title, imageUrl, body}, page);

          const mostRecentPage = {
            id: mockPages[0].id,
            created_at,
            count: 3,
            next: 'www.foo.com',
            previous: 'www.bar.com',
            results: [...mostRecentPageWithTwoArticles, newBlogArticle],
          };

          await addArticleToDatabase(newBlogArticle);

          expect(mockUpdate).toBeCalledTimes(1);
          expect(mockUpdate).toBeCalledWith(mostRecentPage);
        });
      });
      describe('AND: The most recent page has 1 blog entry in it,', () => {
        it('THEN: add the blog entry to the most recent page.', async () => {
          const onlyOneArticle = [{}];
          const mockPages = [
            {
              id: 1,
              created_at: new Date(12),
              count: 1,
              next: 'www.foo.com',
              previous: 'www.bar.com',
              results: onlyOneArticle,
            }
          ];
          getSupabaseClient.mockImplementationOnce(() => ({
            from: jest.fn(() => ({
              select: jest.fn(() => ({
                order: jest.fn(() => ({
                  data: mockPages,
                })),
              })),
              upsert: mockUpsert,
              update: mockUpdate,
            })),
          }));

          const title = 'Test title';
          const imageUrl = 'example.com';
          const body = 'This is the body of the article.';
          const page = 1;
          const newBlogArticle = new Article(title, imageUrl, body, page);

          const id = mockPages[0].id;
          const created_at = expect.any(Object);
          const count = 2;
          const next = 'www.foo.com';
          const previous = 'www.bar.com';
          const results = [{},newBlogArticle];
          const expectedNewPage = new BlogPage(id, created_at, count, next, previous, results);

          await addArticleToDatabase(newBlogArticle);

          expect(mockUpdate).toBeCalledTimes(1);
          expect(mockUpdate).toBeCalledWith(expectedNewPage);
        });
      });
    });
  });
  describe('GIVEN: invalid blog data,', () => {
    describe('WHEN: the new blog entry is missing a field', () => {
      it('THEN: returns an error.', () => {
        const spy = jest.spyOn(console, 'log').mockImplementationOnce(jest.fn());
        const title = null;
        const imageUrl = 'example.com';
        const body = null;
        const page = 1;
        const missingTitleAndBody = new Article(title, imageUrl, body, page);

        addArticleToDatabase(missingTitleAndBody);

        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith('Articles is missing attributes.');
      });
    });
  });
  describe('WHEN: supabase or the factory has a problem', () => {
    it('THEN: it logs an error.', () => {
      const error = new Error('Supabase is broken');
      getSupabaseClient.mockImplementationOnce(() => {
        throw error;
      });
      const spy = jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());

      const title = 'Test title';
      const imageUrl = 'example.com';
      const body = 'This is the body of the article.';
      const page = 1;
      const newBlogArticle = new Article(title, imageUrl, body, page);

      addArticleToDatabase(newBlogArticle);

      expect(spy).toBeCalledWith('糟了，操作失敗: ', error);
    });
  });
});
