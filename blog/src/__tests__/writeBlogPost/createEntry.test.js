import { getSupabaseClient } from '../../common/factory';
import { Article } from '../../common/models/Article';
import {createArticle} from "../../createArticle/createArticle";
import {BlogPage} from "../../common/models/Page";

jest.mock('../../common/factory');

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createArticle()", () => {
  describe("GIVEN: valid blog data,", () => {
    describe("WHEN: the handler is invoked", () => {
      describe("AND: The most recent page has 3 blog entries in it,", () => {
        it("THEN: should create a new page in the database and add the blog entry to it.", async () => {
          const mockUpsert = jest.fn();

          const mockBlogEntries = [];
          getSupabaseClient.mockImplementationOnce(jest.fn(() => ({
            from: jest.fn(() => ({
              select: jest.fn(() => ({
                order: jest.fn(() => ({
                  data: mockBlogEntries,
                })),
              })),
              upsert: mockUpsert,
            })),
          })));

          const title = 'Test title';
          const imageUrl = 'example.com';
          const body = 'This is the body of the article.';
          const likes = 0;
          const views = 0;
          const newBlogArticle = new Article(title, imageUrl, body, likes, views);

          const id = 1;
          const created_at = new Date(123);
          const count = 1;
          const next = null;
          const previous = null;
          const results = [newBlogArticle];
          const expectedNewPage = new BlogPage(id, created_at, count, next, previous, results);

          await createArticle(newBlogArticle);

          expect(mockUpsert).toBeCalledTimes(1);
          expect(mockUpsert).toBeCalledWith(expectedNewPage);
        });
      });
      describe("AND: The most recent page has 2 blog entries in it,", () => {
        it("THEN: should create a new page in the database and add the blog entry to it.", () => {

        });
      });
      describe("AND: The most recent page has 1 blog entry in it,", () => {
        it("THEN: should create a new page in the database and add the blog entry to it.", () => {

        });
      });
    });
  });
});
