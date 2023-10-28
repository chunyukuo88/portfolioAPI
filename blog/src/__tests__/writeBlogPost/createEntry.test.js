import { getSupabaseClient } from '../../common/factory';
import { Article } from '../../common/models/Article';
import { createArticle } from '../../createArticle/createArticle';
import { BlogPage } from '../../common/models/Page';

jest.mock('../../common/factory');

afterEach(() => {
  jest.clearAllMocks();
});

const mockUpsert = jest.fn();
const mockUpdate = jest.fn();

describe('createArticle()', () => {
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
            results: [{},{},{}]
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
        const newBlogArticle = new Article(title, imageUrl, body, page);

        const id = 2;
        const created_at = expect.any(Object);
        const count = 1;
        const next = null;
        const previous = `${process.env.GET_ALL_INFINITE}${1}`;
        const results = [newBlogArticle];
        const expectedNewPage = new BlogPage(id, created_at, count, next, previous, results);

        it('THEN: should create a new page in the database and add the blog entry to it.', async () => {
          await createArticle(newBlogArticle);

          expect(mockUpsert).toBeCalledTimes(1);
        });
        it('THEN: should add the non-editable attributes such as articleId, likes, and views', () => {
          expect(mockUpsert).toBeCalledWith(expectedNewPage);
        });
        it('THEN: should also update the `next` field of the previous database entry', () => {
          // TODO Compare database rows 4 and 5. Note that database row 4 should have a 'next' field with a URL rather than the current 'null' value.
        });
      });
      describe('AND: The most recent page has 2 blog entries in it,', () => {
        it('THEN: add the blog entry to the most recent page.', async () => {
          const twoArticles = [{},{}];
          const mockPages = [
            {
              id: 1,
              created_at: new Date(12),
              count: twoArticles.length,
              next: 'www.foo.com',
              previous: 'www.bar.com',
              results: twoArticles
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
          const count = 3;
          const next = 'www.foo.com';
          const previous = 'www.bar.com';
          const results = [{},{},newBlogArticle];
          const expectedNewPage = new BlogPage(id, created_at, count, next, previous, results);

          await createArticle(newBlogArticle);

          expect(mockUpdate).toBeCalledTimes(1);
          expect(mockUpdate).toBeCalledWith(expectedNewPage);
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

          await createArticle(newBlogArticle);

          expect(mockUpdate).toBeCalledTimes(1);
          expect(mockUpdate).toBeCalledWith(expectedNewPage);
        });
      });
    });
  });
  // describe('GIVEN: invalid blog data,', () => {
  //   describe('WHEN: the new blog entry is missing a field', () => {
  //     it('THEN: returns an error.', () => {
  //       const spy = jest.spyOn(console, 'log').mockImplementationOnce(jest.fn());
  //       const title = null;
  //       const imageUrl = 'example.com';
  //       const body = null;
  //       const page = 1;
  //       const missingTitleAndBody = new Article(title, imageUrl, body, page);
  //
  //       createArticle(missingTitleAndBody);
  //
  //       expect(spy).toBeCalledTimes(1);
  //       expect(spy).toBeCalledWith('Articles is missing attributes.');
  //     });
  //   });
  // });
  // describe('WHEN: supabase or the factory has a problem', () => {
  //   it('THEN: it logs an error.', () => {
  //     const error = new Error('Supabase is broken');
  //     getSupabaseClient.mockImplementationOnce(() => {
  //       throw error;
  //     });
  //     const spy = jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());
  //
  //     const title = 'Test title';
  //     const imageUrl = 'example.com';
  //     const body = 'This is the body of the article.';
  //     const page = 1;
  //     const newBlogArticle = new Article(title, imageUrl, body, page);
  //
  //     createArticle(newBlogArticle);
  //
  //     expect(spy).toBeCalledWith('糟了，操作失敗: ', error);
  //   });
  // });
});
