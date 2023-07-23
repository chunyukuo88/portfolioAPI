import { updateEntry } from "../../../TEMP/updateBlogPost/updateEntry";
import { errorMessages, httpStatus, standardHeaders } from "../../common/http";
import { updateBlogPost } from "../../../TEMP/updateBlogPost/httpHandler";

jest.mock("../../updateBlogPost/updateEntry");
const loggerSpy = jest.spyOn(console, "log").mockImplementation(jest.fn());
const errorSpy = jest.spyOn(console, "error").mockImplementation(jest.fn());

describe("GIVEN: updateBlogPost/httpHandler.updateBlogPost()", () => {
  describe("GIVEN: A valid HTTP request containing updates to a blog post", () => {
    describe("WHEN: this function is called", () => {
      const resultingEntryAfterUpdateCompletes = {
        title: "some updated title",
        theme: "unchanged theme",
        imageUrl: "unchanged image URL",
        likes: 0,
        views: 0,
      };
      const validBlogUpdates = {
        title: "some updated title",
      };
      const httpRequest = {
        pathParameters: {},
        body: JSON.stringify(validBlogUpdates),
      };
      const expectedResult = {
        statusCode: httpStatus.SUCCESSFUL,
        body: JSON.stringify(resultingEntryAfterUpdateCompletes),
        headers: standardHeaders,
      };
      beforeEach(() => {
        updateEntry.mockReturnValueOnce(resultingEntryAfterUpdateCompletes);
      });
      it("THEN: returns a success response containing the resultant updated blog entry.", async () => {
        const result = await updateBlogPost(httpRequest);

        expect(result).toEqual(expectedResult);
      });
      it("THEN: logs that success response received from the controller.", async () => {
        await updateBlogPost(httpRequest);

        expect(loggerSpy).toBeCalledWith(resultingEntryAfterUpdateCompletes);
      });
    });
  });
  describe("GIVEN: there is a problem with the database", () => {
    describe("WHEN: this function is called with otherwise valid data", () => {
      const controllerError = new Error("error from Controller");
      beforeEach(() => {
        updateEntry.mockImplementationOnce(() => {
          throw controllerError;
        });
      });
      const validBlogUpdates = {
        title: "some updated title",
        theme: "an updated theme",
      };
      const httpRequest = {
        pathParameters: {},
        body: JSON.stringify(validBlogUpdates),
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
      it("THEN: logs the error.", async () => {
        await updateBlogPost(httpRequest);

        expect(errorSpy).toBeCalledTimes(1);
        expect(errorSpy).toBeCalledWith(controllerError);
      });
      it("THEN: returns an error response.", async () => {
        const result = await updateBlogPost(httpRequest);

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
