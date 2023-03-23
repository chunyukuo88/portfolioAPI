import { createEntry } from "./createEntry";
import { getRepository } from "../common/repository";

jest.mock("../common/repository");

describe("GIVEN: valid blog data,", () => {
  describe("WHEN: this function is invoked,", () => {
    it("THEN: it returns a new blog entity, which is returned to the handler.", async () => {
      const mockBlogEntity = {
        foo: "bar",
      };
      getRepository.mockReturnValueOnce({
        blogPostRepository: {
          createAndSave: () => {
            return mockBlogEntity;
          },
        },
        client: {
          close: jest.fn(),
        },
      });
      const blogData = {
        title: "test",
        creationTimeStamp: '1679409635239',
        theme: "test",
        imageUrl: "test",
        likes: 0,
        views: 0,
      };

      const result = await createEntry(blogData);

      expect(result).toEqual(mockBlogEntity);
    });
  });
});
