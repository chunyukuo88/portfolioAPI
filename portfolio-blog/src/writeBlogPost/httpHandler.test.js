import { writeBlogPost } from "./httpHandler";
import { createPost } from "./controller";
import { httpStatus } from "../common/http";

jest.mock("./controller");

afterEach(() => {
  jest.clearAllMocks();
});

describe("GIVEN: A valid HTTP request containing a blog post", () => {
  describe("WHEN: this function is called", () => {
    const redisEntryId = 1;
    let spy;
    beforeEach(() => {
      createPost.mockReturnValueOnce(redisEntryId);
      spy = jest.spyOn(console, "log").mockImplementationOnce(jest.fn());
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
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
      },
    };
    it("THEN: the function's execution is logged.", async () => {
      const spy = jest.spyOn(console, "log").mockImplementationOnce(jest.fn());

      await writeBlogPost(httpRequest);

      expect(spy).toBeCalledTimes(1);
    });
    it("THEN: publishes the post to the database.", async () => {
      const result = await writeBlogPost(httpRequest);

      expect(result).toEqual(expectedResult);
    });
  });
});
