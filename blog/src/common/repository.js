import { Client, Entity, Schema } from 'redis-om';
import * as dotenv from 'dotenv';

dotenv.config();

class BlogPost extends Entity {}

const blogSchemaOptions = { dataStructure: 'JSON' };

const blogPostSchema = new Schema(
  BlogPost,
  {
    creationTimeStamp: { type: 'number' },
    title: { type: 'string' },
    theme: { type: 'string' },
    imageUrl: { type: 'string' },
    likes: { type: 'number' },
    views: { type: 'number' },
    page: { type: 'number' },
  },
  blogSchemaOptions,
);

async function getClient() {
  const client = await new Client().open(process.env.REDIS_PUBLIC_DB);
  return client;
}

export async function getRepository() {
  const client = await getClient();
  const blogPostRepository = client.fetchRepository(blogPostSchema);
  return { blogPostRepository, client };
}
