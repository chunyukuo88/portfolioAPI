import { errorMessages, httpStatus, standardHeaders } from '../common/http';
import { handler } from './httpHandler';
import { deletePost } from './deletePost';

jest.mock('./deletePost');

afterEach(() => {
  jest.clearAllMocks();
});

let logSpy, errorSpy;
beforeAll(() => {
  logSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
  errorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn());
});

describe('handler/0', () => {
  describe('GIVEN: there are no problems with the Redis server,', () => {
    describe('WHEN: this function is invoked with a valid HTTP request,', () => {
      const validRequest = {
        pathParameters: 'BlogPost:01GTJJTGBTCA1CV7EGPDD6FFT0',
      };

      it('THEN: it invokes its logger function.', async () => {
        await handler(validRequest);

        expect(logSpy).toBeCalledWith('deleteBlogPost.handler()');
      });
      it('THEN: it returns a success response.', async () => {
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
});
