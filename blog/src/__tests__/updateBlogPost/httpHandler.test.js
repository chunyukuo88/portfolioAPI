import { updateEntry } from "../../updateBlogPost/updateEntry";
import { errorMessages, httpStatus, standardHeaders } from "../../common/http";
import { updateBlogPost } from "../../updateBlogPost/httpHandler";

jest.mock("../../updateBlogPost/updateEntry");
jest.spyOn(console, 'log').mockImplementation(jest.fn());

describe('GIVEN: updateBlogPost/httpHandler.updateBlogPost()', () => {
  describe('GIVEN: A valid HTTP request containing updates to a blog post', () => {
    describe('WHEN: this function is called', () => {
      const resultingEntryAfterUpdateCompletes = {
        title: 'some updated title',
        theme: 'unchanged theme',
        imageUrl: 'unchanged image URL',
        likes: 0,
        views: 0,
      };
      const updatesToExistingBlog = {
        title: 'some updated title',
      };
      const httpRequest = {
        pathParameters: {},
        body: JSON.stringify(updatesToExistingBlog),
      };
      const expectedResult = {
        statusCode: httpStatus.SUCCESSFUL,
        body: JSON.stringify(resultingEntryAfterUpdateCompletes),
        headers: standardHeaders,
      };
      beforeEach(() => {
        updateEntry.mockReturnValueOnce(resultingEntryAfterUpdateCompletes);
      });
      it('THEN: returns a success response containing the resultant updated blog entry.', async () => {
        const result = await updateBlogPost(httpRequest);

        expect(result).toEqual(expectedResult);
      });
      it('THEN: logs that success response received from the controller.', async () => {
        await updateBlogPost(httpRequest);

        expect(console.log).toBeCalledWith(resultingEntryAfterUpdateCompletes);
      });
    });
  });
});
