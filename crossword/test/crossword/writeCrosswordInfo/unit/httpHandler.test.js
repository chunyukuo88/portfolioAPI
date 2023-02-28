import { writeCrosswordInfo } from '../../../../src/crossword/writeCrosswordInfo/httpHandler';
import * as getClient from '../../../../src/common/factory';
import { httpStatus } from '../../../../src/common/http';

beforeEach(() => {
  jest.clearAllMocks();
});

const supabaseClientMock = {
  from: jest.fn().mockReturnThis(),
  insert: jest.fn().mockResolvedValueOnce({}),
};

const validCrosswordData = [{
  solution: 'abcd',
  author: 'Test',
  title: 'TEST UPLOAD',
  theme: 'Test',
  cluesAcross: '1. Foo,2. Bar',
  cluesDown: '1. Foz,2. Baz',
}];
const validHttpRequest = {
  pathParameters: {},
  body: JSON.stringify(validCrosswordData),
};
describe('writeCrosswordInfo/httpHandler()', () => {
  describe('GIVEN: a request containing valid data', () => {
    describe('WHEN: this function is invoked,', () => {
      let consoleSpy;
      beforeEach(() => {
        jest.spyOn(supabaseClientMock, 'from').mockReturnThis();
        jest.spyOn(supabaseClientMock, 'insert').mockReturnValueOnce({});
        jest.spyOn(getClient, 'getSupabaseClient').mockReturnValueOnce(supabaseClientMock);
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
      });
      it('THEN: It uses the console.log method to log the function\'s invocation.', async () => {
        await writeCrosswordInfo(validHttpRequest);

        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith('writeCrosswordInfo()');
      });
      it('THEN: it writes the valid data to the database.', async () => {
        await writeCrosswordInfo(validHttpRequest);

        expect(supabaseClientMock.insert).toBeCalledWith(validCrosswordData);
      });
      it('THEN: it returns a success object.', async () => {
        const expectedResponse = {
          statusCode: httpStatus.SUCCESSFUL,
          body: '[]',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
          },
        };

        const response = await writeCrosswordInfo(validHttpRequest);

        expect(response).toEqual(expectedResponse);
      });
    });
  });
  describe('GIVEN: a request that is missing something', () => {
    it.each`
      invalidBodyValue
      ${null}    
      ${undefined}    
      ${''}    
    `('THEN: returns an error response with a 422 status', async ({ invalidBodyValue }) => {
      const expectedResult = {
        statusCode: httpStatus.MISSING_ARGUMENT,
        body: JSON.stringify({
          error: {
            errorMessage: 'Invalid Request',
          },
        }),
      };
      const invalidHttpRequest = {
        pathParameters: {},
        body: invalidBodyValue,
      };

      const result = await writeCrosswordInfo(invalidHttpRequest);

      expect(result).toEqual(expectedResult);
    });
  });
  describe('GIVEN: a problem with the database server', () => {
    let consoleErrorSpy;
    const databaseError = 'server broke';
    beforeEach(() => {
      const brokenSupabase = {
        from: jest.fn().mockReturnThis(),
        insert: jest.fn().mockRejectedValueOnce(new Error(databaseError)),
      };

      jest.spyOn(brokenSupabase, 'from').mockReturnThis();
      jest.spyOn(brokenSupabase, 'insert').mockRejectedValueOnce(new Error(databaseError));
      jest.spyOn(getClient, 'getSupabaseClient').mockReturnValueOnce(brokenSupabase);
      jest.spyOn(console, 'log').mockImplementation(jest.fn());
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });
    it('THEN: returns an error response with a 500 status', async () => {
      const expectedResult = {
        statusCode: httpStatus.INTERNAL_ERROR,
        body: JSON.stringify({
          error: {
            errorMessage: 'Invalid Request',
          },
        }),
      };

      const result = await writeCrosswordInfo(validHttpRequest);

      expect(result).toEqual(expectedResult);
    });
    it('THEN: logs the error', async () => {
      await writeCrosswordInfo(validHttpRequest);

      expect(consoleErrorSpy).toBeCalledWith(new Error(databaseError));
    });
  });
});
