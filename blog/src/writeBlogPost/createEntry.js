import { getRepository } from '../common/repository';

export async function createEntry(blogData) {
  const { blogPostRepository, client } = await getRepository();
  const newEntity = await blogPostRepository.createAndSave(blogData);
  await client.close();
  return newEntity;
}
