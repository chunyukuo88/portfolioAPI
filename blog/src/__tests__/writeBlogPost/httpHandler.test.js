import { createEntry } from "../../../TEMP/writeBlogPost/createEntry";
import { writeBlogPost } from "../../../TEMP/writeBlogPost/httpHandler";
import { errorMessages, httpStatus, standardHeaders } from "../../common/http";

jest.mock("../../writeBlogPost/createArticle");

let spy;
beforeEach(() => {
  spy = jest.spyOn(console, "log").mockImplementationOnce(jest.fn());
});
afterEach(() => {
  jest.clearAllMocks();
});

describe("writeBlogPost/httpHandler.writeBlogPost()", () => {
  describe("GIVEN: A valid HTTP request containing a blog post", () => {
    describe("WHEN: this function is called", () => {
      const redisEntryId = 1;
      beforeEach(() => {
        createEntry.mockReturnValueOnce(redisEntryId);
      });
      const validBlogData = {
        title: "Test title",
        theme: "Test theme",
        imageUrl: "Test image URL",
        likes: 0,
        views: 0,
      };
      const httpRequest = {
        pathParameters: {},
        body: JSON.stringify(validBlogData),
      };
      const expectedResult = {
        statusCode: httpStatus.SUCCESSFUL,
        body: JSON.stringify(1),
        headers: standardHeaders,
      };
      it("THEN: the function's execution is logged.", async () => {
        const spy = jest
          .spyOn(console, "log")
          .mockImplementationOnce(jest.fn());

        await writeBlogPost(httpRequest);

        expect(spy).toBeCalledTimes(1);
      });
      it("THEN: publishes the post to the database.", async () => {
        const result = await writeBlogPost(httpRequest);

        expect(result).toEqual(expectedResult);
      });
    });
  });
  describe("GIVEN: There is a problem with the Redis server,", () => {
    describe("WHEN: this function is invoked with a valid HTTP request,", () => {
      let errorLogger;
      const expectedError = new Error("Redis broke");
      beforeEach(() => {
        createEntry.mockRejectedValueOnce(expectedError);
        errorLogger = jest
          .spyOn(console, "error")
          .mockImplementationOnce(jest.fn());
      });
      const validBlogData = {
        title: "Test title",
        theme: "Test theme",
        imageUrl: "Test image URL",
        likes: 0,
        views: 0,
      };
      const httpRequest = {
        pathParameters: {},
        body: JSON.stringify(validBlogData),
      };
      const expectedResult = {
        statusCode: httpStatus.INTERNAL_ERROR,
        body: JSON.stringify({
          error: {
            errorMessage: errorMessages.INVALID_REQUEST,
          },
        }),
        headers: standardHeaders,
      };
      it("THEN: returns an error response", async () => {
        const result = await writeBlogPost(httpRequest);

        expect(result).toEqual(expectedResult);
      });
      it("THEN: logs the error", async () => {
        await writeBlogPost(httpRequest);

        expect(errorLogger).toBeCalledTimes(1);
        expect(errorLogger).toBeCalledWith(expectedError);
      });
    });
  });
});
