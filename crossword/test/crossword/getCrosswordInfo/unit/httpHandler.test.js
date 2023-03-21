import { getCrosswordInfo } from '../../../../src/crossword/getCrosswordInfo/httpHandler';
import * as getClient from '../../../../src/common/factory';
import { httpStatus } from '../../../../src/common/http';

beforeEach(() => {
  jest.clearAllMocks();
});

const mockCrosswordData = [
  { id: 1, solution: 'abcd'},
  { id: 2, solution: 'efgh'},
  { id: 3, solution: 'kebabalexibeallogresbyssa'},
];

describe('getCrosswordInfo/httpHandler()', () => {
  describe('GIVEN: A logger function and there are no problems with the database,', () => {
    beforeEach(() => {
      const supabaseClientMock = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValueOnce({ data: mockCrosswordData }),
      };
      jest.spyOn(supabaseClientMock, 'from').mockReturnThis();
      jest.spyOn(supabaseClientMock, 'select').mockReturnThis();
      jest.spyOn(supabaseClientMock, 'order').mockResolvedValueOnce({ data: mockCrosswordData });
      jest.spyOn(getClient, 'getSupabaseClient').mockReturnValueOnce(supabaseClientMock);
    });
    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(jest.fn());

    describe('WHEN: this function is invoked,', () => {
      it('THEN: It uses the console.log method to log the function\'s invocation.', async () => {
        await getCrosswordInfo();

        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith('getCrosswordInfo()');
      });
    });
    describe('WHEN: There are no problems with the database', () => {
      it('THEN: It returns an HTTP response object containing an array of each crossword object from Supabase.', async () => {
        const expectedResponse = {
          statusCode: httpStatus.SUCCESSFUL,
          body: JSON.stringify(mockCrosswordData),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
          },
        };

        const response = await getCrosswordInfo();

        expect(response).toStrictEqual(expectedResponse);
      });
    });
  });
  describe('GIVEN: There is a problem with Supabase', () => {
    beforeEach(() => {
      const supabaseClientMock = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockRejectedValueOnce({ error: 'Some error from Supabase' }),
      };
      jest.spyOn(supabaseClientMock, 'from').mockReturnThis();
      jest.spyOn(supabaseClientMock, 'select').mockRejectedValueOnce({ error: 'Some error from Supabase' });
      jest.spyOn(getClient, 'getSupabaseClient').mockReturnValueOnce(supabaseClientMock);
    });
    jest.spyOn(console, 'error').mockImplementation(jest.fn());

    describe('WHEN: This handler is invoked,', () => {
      it('THEN: It returns an HTTP response object containing a status code of 500.', async () => {
        const expectedResponse = {
          statusCode: httpStatus.INTERNAL_ERROR,
          body: JSON.stringify({
            error: {
              errorMessage: 'Invalid Request',
            },
          }),
        };

        const response = await getCrosswordInfo();

        expect(response).toStrictEqual(expectedResponse);
      });
    });
  });
});
