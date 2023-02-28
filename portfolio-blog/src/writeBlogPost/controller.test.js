import * as redisOm from 'redis-om';
import { createPost } from './controller';

jest.mock('redis-om', () => ({
  Client,
  Entity,
  Schema,
  Repository,
}));

describe('GIVEN: valid blog post data,', () => {
  describe('WHEN: this function is invoked,', () => {
    it('THEN: saves the post to the database.', async () => {
      const data = {
        title: 'Test title',
        theme: 'Test theme',
        imageUrl: 'Test imageUrl',
        likes: 0,
        views: 0,
      };

      await createPost(data);

      expect().toBeCalled();
    });
  });
});