import {
  getClient,
  getRepository,
  getSchema
} from './factory';

export async function createPost(data){
  const client = getClient();
  if (!client.isOpen()){
    await client.open(process.env.REDIS_PUBLIC_DB);
  }
  const schema = getSchema();
  const repository = getRepository(schema, client);
  const post = repository.createEntity(data);
  const id = await repository.save(post);
  await client.close();
  return id;
}
