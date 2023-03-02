import { Entity, Schema } from 'redis-om';
import { getClient } from './client';

class BlogPost extends Entity {}

const blogPostSchema = new Schema(BlogPost, {
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  age: { type: 'number' },
  verified: { type: 'boolean' },
  location: { type: 'point' },
  locationUpdated: { type: 'date' },
  skills: { type: 'string[]' },
  personalStatement: { type: 'text' },
});

export async function getRepository() {
  const client = await getClient();
  const blogPostRepository = client.fetchRepository(blogPostSchema);
  return blogPostRepository;
}
