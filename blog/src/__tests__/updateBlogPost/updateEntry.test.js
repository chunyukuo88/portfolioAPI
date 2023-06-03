import { getRepository } from '../../common/repository';
import {buildErrorResponse, buildSuccessResponse, httpStatus} from '../../common/http';
import { updateEntry } from '../../updateBlogPost/updateEntry';

jest.mock("../../common/repository");

afterEach(() => {
  jest.clearAllMocks();
});

describe('GIVEN: an entityId valid data to update an existing blog post', () => {
  describe('WHEN: this function is invoked with a new title and body,', () => {
    test('THEN: it updates the blog post.', async () => {
      const oldBlogData = {
        title: "OLD title",
        creationTimeStamp: "1111111111",
        theme: "OLD content",
        imageUrl: "test",
        likes: 0,
        views: 0,
      };

      getRepository.mockReturnValueOnce({
        blogPostRepository: {
          fetch: () => {
            return oldBlogData;
          },
          save: jest.fn(),
        },
        client: {
          close: jest.fn(),
        },
      });

      const entityId = '01H1N9QG1YWA8KM95JD8HJVMW0';
      const newBlogData = {
        title: "some NEW title",
        creationTimeStamp: "2222222222",
        theme: "NEW content",
      };
      const expectedResult = {
        title: "some NEW title",
        creationTimeStamp: "2222222222",
        theme: "NEW content",
        imageUrl: "test",
        likes: 0,
        views: 0,
      };

      const result = await updateEntry(entityId, newBlogData);

      expect(result).toEqual(expectedResult);
    });
  });
});
