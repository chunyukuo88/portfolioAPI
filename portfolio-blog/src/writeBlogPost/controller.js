import { Client, Entity, Schema, Repository } from 'redis-om';

const blogSchemaDef = {
  title: { type: 'string'},
  theme: { type: 'string'},
  imageUrl: { type: 'string'},
  likes: { type: 'number'},
  views: { type: 'number'},
};

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_PUBLIC_DB);
  }
}

class BlogPost extends Entity{}

const schema = new Schema(
  BlogPost,
  blogSchemaDef,
  { dataStructure: 'JSON' }
);

export async function createPost(data){
  await connect();
  const repository = new Repository(schema, client);
  const post = repository.createEntity(data);
  const id = await repository.save(post);
  return id;
}