import { deletePost } from "./deletePost";

describe("deletePost/1", () => {
  describe("GIVEN: A valid blogPostId", () => {
    describe("WHEN: this function is invoked,", () => {
      it("THEN: deletes that blog entry.", async () => {
        const blogPostId = "BlogPost:01GTM5P7XKK1DFEGACMBZNDH4J";

        const result = await deletePost(blogPostId);

        expect(result).toEqual(blogPostId);
      });
    });
  });
});
