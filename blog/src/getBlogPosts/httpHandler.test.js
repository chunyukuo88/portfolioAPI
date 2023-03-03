import {
  errorMessages,
  httpStatus,
  standardHeaders
} from '../common/http';
import { getAllEntries } from './httpHandler';

jest.mock('./httpHandler');

describe('getAllEntries/0', () => {
  describe('GIVEN: A valid HTTP request,', () => {
    describe('WHEN: this function is invoked', () => {
      it('THEN: it returns a success response.', async () => {
        getAllEntries.mockReturnValueOnce([
          {
            entityId: '01GTM5P7XKK1DFEGACMBZNDH4K',
            imageUrl: '',
            likes: 0,
            theme: 'On rice, dipped in cheese',
            title: 'Roast potatoes',
            views: 0,
          },
          {
            entityId: '01GTM5P7XKK1DFEGACMBZNDH4J',
            imageUrl: '',
            likes: 0,
            theme: 'A fine day to write a blog, wot wot',
            title: 'Bloggimus',
            views: 0,
          },
        ]);

        const httpRequest = {};
        httpRequest.pathParameters = {};

        const expectedResponse = {};

        const response = await getAllEntries();

        expect(response).toEqual(expectedResponse);
      });
    });
  });
});