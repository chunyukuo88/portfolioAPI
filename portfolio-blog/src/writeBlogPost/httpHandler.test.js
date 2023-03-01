import { writeBlogPost } from "./httpHandler";
import { createPost } from "./controller";
import { httpStatus } from "../common/http";

jest.mock("./controller");

describe("GIVEN: A valid HTTP request containing a blog post", () => {
  describe("WHEN: this function is called", () => {
    it("THEN: publishes the post to the database.", async () => {
      const redisEntryId = 1;
      createPost.mockReturnValueOnce(redisEntryId);
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

      const result = await writeBlogPost(httpRequest);

      expect(result).toEqual(expectedResult);
    });
  });
});
