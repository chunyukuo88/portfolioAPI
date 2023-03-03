import { getAllEntries } from './getAllEntries';
import { getRepository } from '../common/repository';

jest.mock('../common/repository');

describe('getAllEntries/0', () => {
  describe('GIVEN: There are no problems with the Redis server,', () => {
    describe('WHEN: this function is invoked,', () => {
      it('THEN: returns an array of blog entry objects.', async () => {
        let expectedResult;
        getRepository.mockReturnValueOnce({
          blogPostRepository: {
            fetch: async() => {
              expectedResult = [
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
              return expectedResult;
            },
          },
          client: {
            close: jest.fn(),
          },
        });

        const result = await getAllEntries();

        expect(result).toEqual(expectedResult);
      });
    });
  });
});