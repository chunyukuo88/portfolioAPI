import { Client, Entity, Schema } from 'redis-om';
import { createEntry } from './createEntry';

describe('GIVEN: valid blog data,', () => {
  describe('WHEN: this function is invoked,', () => {
    it('THEN: it returns a new blog entity, which is returned to the handler.', async () => {
      const blogData = {
        title: 'test',
        theme: 'test',
        imageUrl: 'test',
        likes: 0,
        views: 0,
      };

      const result = await createEntry(blogData);

      expect(result).toBeInstanceOf(Entity);
    });
  });
});
