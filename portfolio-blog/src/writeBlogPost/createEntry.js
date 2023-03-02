import { Client, Entity, Schema } from 'redis-om';
import * as dotenv from 'dotenv';
dotenv.config();

class BlogPost extends Entity {}

const blogSchemaOptions = { dataStructure: 'JSON' };

const blogPostSchema = new Schema(
  BlogPost,
  {
    title: { type: 'string' },
    theme: { type: 'string' },
    imageUrl: { type: 'string' },
    likes: { type: 'number' },
    views: { type: 'number' },
  },
  blogSchemaOptions
);

async function getClient() {
  console.log('getClient()');
  console.log('from .env file: ', process.env.REDIS_PUBLIC_DB);
  const client = await new Client().open(
    'redis://default:OKmUXxxoFcmCH042OIWb7f4fcHJkbYJy@redis-14990.c10.us-east-1-3.ec2.cloud.redislabs.com:14990',
  );
  return client;
}

async function getRepository() {
  console.log('getRepository()');
  const client = await getClient();
  const blogPostRepository = client.fetchRepository(blogPostSchema);
  return { blogPostRepository, client };
}

export async function createEntry(blogData) {
  console.log('doTheThing()');
  const { blogPostRepository, client } = await getRepository();
  const newEntity = await blogPostRepository.createAndSave(blogData);
  await client.close();
  return newEntity;
}
