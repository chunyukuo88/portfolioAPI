import { getRepository } from "../../common/repository";
import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from "../../common/http";
import { updateEntry } from "../../updateBlogPost/updateEntry";

jest.mock("../../common/repository");
jest.spyOn(console, "error").mockImplementation(jest.fn());
jest.spyOn(console, "log").mockImplementation(jest.fn());

afterEach(() => {
  jest.clearAllMocks();
});
const entityId = "01H1N9QG1YWA8KM95JD8HJVMW0";

describe("GIVEN: an entityId valid data to update an existing blog post", () => {
  describe("WHEN: this function is invoked with a new title and body,", () => {
    const oldBlogData = {
      title: "OLD title",
      creationTimeStamp: "1111111111",
      theme: "OLD content",
      imageUrl: "test",
      someOtherFieldThatWillNotBeUpdated: "this will not change",
      likes: 0,
      views: 0,
    };
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
      someOtherFieldThatWillNotBeUpdated: "this will not change",
      likes: 0,
      views: 0,
    };
    beforeEach(() => {
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
    });
    test("THEN: it updates the blog post.", async () => {
      const result = await updateEntry(entityId, newBlogData);

      expect(result).toEqual(expectedResult);
    });
    test("THEN: it logs the function execution and concatenates the successfully updated object.", async () => {
      const result = await updateEntry(entityId, newBlogData);

      expect(console.log).toBeCalledTimes(2);
      expect(console.log).toBeCalledWith(
        `updateEntry() - entityId: ${entityId} - blogData: ${newBlogData}.`
      );
      expect(console.log).toBeCalledWith(result);
    });
  });
  describe("WHEN: there is a problem with the database,", () => {
    const newBlogData = {
      title: "some NEW title",
      creationTimeStamp: "2222222222",
      theme: "NEW content",
    };
    const expectedError = new Error(
      "There was a problem updating the blog post."
    );
    beforeEach(() => {
      getRepository.mockRejectedValue(expectedError);
    });
    test("THEN: it returns an internal error.", async () => {
      const result = await updateEntry(entityId, newBlogData);

      expect(result).toEqual(buildErrorResponse(httpStatus.INTERNAL_ERROR));
    });
    test("THEN: it returns an internal error.", async () => {
      await updateEntry(entityId, newBlogData);

      expect(console.error).toBeCalledTimes(1);
      expect(console.error).toBeCalledWith(expectedError);
    });
  });
});
