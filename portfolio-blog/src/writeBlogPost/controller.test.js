import {
  getClient,
  getRepository,
  getSchema,
} from './factory';
import { createPost } from './controller';

jest.mock('./factory');

describe('GIVEN: valid blog post data,', () => {
  describe('WHEN: this function is invoked,', () => {
    it('THEN: saves the post to the database.', async () => {
      getClient.mockReturnValueOnce({
        isOpen: () => false,
        open: (redisDatabaseUrl) => jest.fn(),
        close: () => jest.fn(),
        fetchRepository: (schema) => {
          const repository = {
            createEntity: () => {},
          };
          return repository;
        },
      });
      getSchema.mockReturnValueOnce({});
      getRepository.mockReturnValueOnce({
        createEntity: (data) => {
          const post = 'some post';
          return post;
        },
        save: () => new Promise((resolve, reject) => {
          const id = 'some id';
          resolve(id);
        })
      });
      const data = {
        title: 'Test title',
        theme: 'Test theme',
        imageUrl: 'Test imageUrl',
        likes: 0,
        views: 0,
      };

      const id = await createPost(data);

      expect(id).toEqual('some id');
    });
  });
});