import { errorMessages, httpStatus, standardHeaders } from "../../common/http";
import { handler } from "../../deleteBlogPost/httpHandler";
import { deletePost } from "../../deleteBlogPost/deletePost";

jest.mock("../../deleteBlogPost/deletePost");

afterEach(() => {
  jest.clearAllMocks();
});

let logSpy, errorSpy;
beforeAll(() => {
  logSpy = jest.spyOn(console, "log").mockImplementation(jest.fn());
  errorSpy = jest.spyOn(console, "error").mockImplementation(jest.fn());
});
const validRequest = {
  pathParameters: "BlogPost:01GTJJTGBTCA1CV7EGPDD6FFT0",
};
describe("handler/0", () => {
  describe("GIVEN: there are no problems with the Redis server,", () => {
    describe("WHEN: this function is invoked with a valid HTTP request,", () => {
      it("THEN: it invokes its logger function.", async () => {
        await handler(validRequest);

        expect(logSpy).toBeCalledWith("deleteBlogPost.handler()");
      });
      it("THEN: it returns a success response.", async () => {
        deletePost.mockReturnValueOnce(validRequest.pathParameters);
        const expectedResponse = {
          statusCode: httpStatus.SUCCESSFUL,
          body: JSON.stringify(validRequest.pathParameters),
          headers: standardHeaders,
        };

        const response = await handler(validRequest);

        expect(response).toEqual(expectedResponse);
      });
    });
  });
  describe("WHEN: The Redis server is on the fritz", () => {
    const mockError = new Error("Redis is broken");
    beforeEach(() => {
      deletePost.mockRejectedValueOnce(mockError);
    });
    it("THEN: returns an error response.", async () => {
      await handler(validRequest);

      expect(errorSpy).toBeCalledWith(mockError);
    });
    it("THEN: returns an error response.", async () => {
      const expectedResponse = {
        statusCode: httpStatus.INTERNAL_ERROR,
        body: JSON.stringify({
          error: {
            errorMessage: errorMessages.INVALID_REQUEST,
          },
        }),
        headers: standardHeaders,
      };

      const response = await handler(validRequest);

      expect(response).toEqual(expectedResponse);
    });
  });
});
