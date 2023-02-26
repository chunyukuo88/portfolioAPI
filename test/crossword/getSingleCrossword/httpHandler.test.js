import { getSingleCrossword } from '../../../src/crossword/getSingleCrossword/httpHandler';
import * as getClient from '../../../src/common/factory';
import { httpStatus } from '../../../src/common/http';

const mockCrosswordData = {
  id: 1,
  solution: 'abcd',
  created_at: Date.now(),
  author: 'Alex Gochenour',
  title: 'Test',
  theme: 'Test',
  cluesAcross: '1. Foo,2. Bar',
  cluesDown: '1. Foz,2. Baz',
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'log').mockImplementation(jest.fn());
});

describe('getSingleCrossword()', () => {
  describe('GIVEN: there are no problems with the database,', () => {
    describe('WHEN: given a request to access the latest crossword\'s info,', () => {
      beforeEach(() => {
        const supabaseClientMock = {
          from: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          limit:  jest.fn().mockResolvedValueOnce({ data: mockCrosswordData }),
        };
        jest.spyOn(getClient, 'getSupabaseClient').mockReturnValueOnce(supabaseClientMock);
      });
      it('THEN: The logger function executes, indicating that this function has been invoked.', async () => {
        const spy = jest.spyOn(console, 'log').mockImplementation(jest.fn());

        await getSingleCrossword();

        expect(spy).toBeCalledWith('getSingleCrossword()');
      });
      it('THEN: returns an HTTP response object containing the most recent crossword object from Supabase.', async () => {
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

        const response = await getSingleCrossword();

        expect(response).toStrictEqual(expectedResponse);
      });
    });
  });
  describe('WHEN: there are problems with the database,', () => {
    describe('WHEN: given a request to access the latest crossword\'s info,', () => {
      const mockError = new Error('error');
      beforeEach(() => {
        const supabaseClientMock = {
          from: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          limit:  jest.fn().mockRejectedValueOnce(mockError),
        };
        jest.spyOn(getClient, 'getSupabaseClient').mockReturnValueOnce(supabaseClientMock);
      });
      test('THEN: It logs the errror', async () => {
        const spy = jest.spyOn(console, 'log').mockImplementationOnce(jest.fn());

        await getSingleCrossword();

        expect(spy).toBeCalledWith(mockError);
      });
      test('THEN: it throws an error', async () => {
        const expectedResponse = {
          statusCode: httpStatus.INTERNAL_ERROR,
          body: JSON.stringify({
            error: {
              errorMessage: 'Invalid Request',
            },
          }),
        };
        const response = await getSingleCrossword();

        expect(response).toStrictEqual(expectedResponse);
      });
    });
  });
});
