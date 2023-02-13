import { writeCrosswordInfo } from '../../../../src/crossword/writeCrosswordInfo/httpHandler';
import * as getClient from '../../../../src/common/factory';
import { httpStatus } from '../../../../src/common/http';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('writeCrosswordInfo/httpHandler()', () => {
  describe('GIVEN: a request containing valid data', () => {
    describe('WHEN: this function is invoked,', () => {
      beforeEach(() => {
        const supabaseClientMock = {
          from: jest.fn().mockReturnThis(),
          insert: jest.fn().mockResolvedValueOnce({}),
        };
        jest.spyOn(supabaseClientMock, 'from').mockReturnThis();
        jest.spyOn(supabaseClientMock, 'insert').mockReturnValueOnce({});
        jest.spyOn(getClient, 'getSupabaseClient').mockReturnValueOnce(supabaseClientMock);
      });
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(jest.fn());

      it('THEN: It uses the console.log method to log the function\'s invocation.', async () => {
        const httpRequest = {};

        await writeCrosswordInfo(httpRequest);

        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith('writeCrosswordInfo()');
      });

      it('THEN: it writes the valid data to the database.', () => {

      });
    });
  });
});