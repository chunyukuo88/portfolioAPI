import { getAllEntries } from "../../getBlogPosts/getAllEntries";
import "../../common/factory";

const mockBlogEntries = [
  {
    id: "123",
    created_at: "1",
    title: "Roast potatoes",
    body: "On rice, dipped in cheese",
    likes: 0,
    views: 0,
    page: 1,
  },
  {
    id: "1234",
    created_at: "1",
    title: "Some Other Bread",
    body: "Great!",
    likes: 0,
    views: 0,
    page: 1,
  },
];

jest.mock("../../common/factory", () => ({
  getSupabaseClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() => ({
          data: mockBlogEntries,
        })),
      })),
    })),
  })),
}));

describe("getAllEntries/0", () => {
  describe("GIVEN: There are no problems with the Supabase server,", () => {
    describe("WHEN: this function is invoked,", () => {
      it("THEN: returns an array of blog entry objects.", async () => {
        const result = await getAllEntries();

        expect(result.body).toEqual(JSON.stringify(mockBlogEntries));
      });
    });
  });
});
