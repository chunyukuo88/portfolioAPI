import { errorMessages, httpStatus, standardHeaders } from '../common/http';
import { handler } from './httpHandler';
import { getAllEntries } from './getAllEntries';

jest.mock('./getAllEntries');

afterEach(() => {
  jest.clearAllMocks();
});

describe('handler/0', () => {
  describe('GIVEN: there are no problems with the Redis server,', () => {
    describe('WHEN: this function is invoked with a valid HTTP request,', () => {
      it('THEN: it returns a success response.', async () => {
        const expectedData = [
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
        ];
        getAllEntries.mockReturnValueOnce(expectedData);

        const httpRequest = {};
        httpRequest.pathParameters = {};

        const expectedResponse = {
          statusCode: httpStatus.SUCCESSFUL,
          body: JSON.stringify(expectedData),
          headers: standardHeaders,
        };

        const response = await handler(httpRequest);

        expect(response).toEqual(expectedResponse);
      });
    });
  });
  describe('GIVEN: there is a problem with the Redis server,', () => {
    describe('WHEN: this function is invoked with a valid HTTP request,', () => {
      it('THEN: it returns an error response with a 500 status.', async () => {
        const expectedErrorMsg = 'Redis server is down.';
        getAllEntries.mockRejectedValueOnce(new Error(expectedErrorMsg));

        const httpRequest = {};
        httpRequest.pathParameters = {};

        const expectedResponse = {
          statusCode: httpStatus.INTERNAL_ERROR,
          body: JSON.stringify({
            error: {
              errorMessage: errorMessages.INVALID_REQUEST,
            },
          }),
          headers: standardHeaders,
        };

        const response = await handler(httpRequest);

        expect(response).toEqual(expectedResponse);
      });
    });
  });
  describe('GIVEN: any state of the Redis server, up or down,', () => {
    describe('WHEN: this handler is invoked,', () => {
      it('THEN: its invocation is logged.', async () => {
        const spy = jest
          .spyOn(console, 'log')
          .mockImplementationOnce(jest.fn());
        const httpRequest = {};
        httpRequest.pathParameters = {};

        await handler(httpRequest);

        expect(spy).toBeCalledTimes(1);
      });
    });
  });
});
