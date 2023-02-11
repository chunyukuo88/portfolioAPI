import { getCrosswordInfo } from '../../../../src/crossword/getCrosswordInfo/httpHandler';
import * as getClient from '../../../../src/common/factory';

beforeEach(() => {
  jest.clearAllMocks();
})

const mockCrosswordData = [
  { id: 1, solution: 'abcd'},
  { id: 2, solution: 'efgh'},
  { id: 3, solution: 'kebabalexibeallogresbyssa'},
];

describe('GIVEN: A logger function,', () => {
  beforeEach(() => {
    const supabaseClientMock = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValueOnce({ data: mockCrosswordData }),
    };
    jest.spyOn(supabaseClientMock, 'from').mockReturnThis();
    jest.spyOn(supabaseClientMock, 'select').mockResolvedValueOnce({ data: mockCrosswordData });
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
    it('THEN: It returns an array of each crossword object from Supabase.', async () => {
      const expectedResponse = {
        statusCode: 200,
        data: mockCrosswordData,
      };

      const response = await getCrosswordInfo();

      expect(response).toStrictEqual(expectedResponse);
    });
  });
});