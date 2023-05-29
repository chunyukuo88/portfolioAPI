import { deletePost } from "./deletePost";
import { getRepository } from "../common/repository";
import {buildErrorResponse, buildSuccessResponse, httpStatus} from "../common/http";

jest.mock("../common/repository");

let log, error;
beforeAll(() => {
  log = jest.spyOn(console, "log").mockImplementation(jest.fn());
  error = jest.spyOn(console, "error").mockImplementation(jest.fn());
});
afterEach(() => {
  jest.clearAllMocks();
});

describe("deletePost/1", () => {
  describe("GIVEN: A valid blogPostId", () => {
    describe("WHEN: this function is invoked,", () => {
      beforeEach(() => {
        getRepository.mockReturnValueOnce({
          blogPostRepository: {
            remove: jest.fn(),
          },
          client: {
            close: jest.fn(),
          },
        });
      });
      it("THEN: console logs the function execution", async () => {
        const blogPostId = "BlogPost:01GTM5P7XKK1DFEGACMBZNDH4J";

        const result = await deletePost(blogPostId);

        expect(log).toBeCalledWith("deletePost()");
      });
      it("THEN: deletes that blog entry.", async () => {
        const blogPostId = "BlogPost:01GTM5P7XKK1DFEGACMBZNDH4J";

        const result = await deletePost(blogPostId);

        expect(result).toEqual(buildSuccessResponse(blogPostId));
      });
    });
  });
  describe("GIVEN: An invalid blogPostId", () => {
    describe("WHEN: this function is invoked,", () => {
      const expectedError = new Error(
        "There was a problem removing the blog post."
      );
      beforeEach(() => {
        getRepository.mockReturnValueOnce({
          blogPostRepository: {
            remove: () => {
              throw expectedError;
            },
          },
          client: {
            close: jest.fn(),
          },
        });
      });
      it("THEN: returns an error.", async () => {
        const blogPostId = "__some invalid id__";

        const result = await deletePost(blogPostId);

        expect(result).toEqual(buildErrorResponse(httpStatus.INTERNAL_ERROR));
      });
      it("THEN: It logs the error", async () => {
        const blogPostId = "__some invalid id__";

        await deletePost(blogPostId);

        expect(error).toBeCalledWith(expectedError);
      });
    });
  });
});
