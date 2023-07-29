import { getByPage } from "../../../TEMP/getBlogsByPage/getByPage";
import { getRepository } from "../../common/repository";

jest.mock("../../common/repository", () => ({
  getRepository: jest.fn(),
}));

describe("getByPage/1", function () {
  describe("GIVEN: A page number,", () => {
    describe("WHEN: This function is invoked,", () => {
      it("THEN: returns an array of blog entry objects containing that exact page number", async () => {
        const mockBlogEntries = [
          {
            entityId: "01GTM5P7XKK1DFEGACMBZNDH4J",
            imageUrl: "",
            likes: 0,
            theme: "Page 2 Posts",
            title: "A Walk on the Mild Side",
            views: 0,
            page: 2,
          },
        ];

        getRepository.mockResolvedValue({
          blogPostRepository: {
            createIndex: jest.fn(),
            search: () => ({
              where: jest.fn().mockReturnThis(),
              eq: jest.fn().mockReturnThis(),
              return: {
                all: () => mockBlogEntries,
              },
              search: jest.fn().mockReturnThis(),
            }),
          },
          client: {
            close: jest.fn(),
          },
        });

        const result = await getByPage(2);

        expect(result).toEqual(mockBlogEntries);
      });
    });
  });
});
