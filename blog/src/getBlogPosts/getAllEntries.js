import { getRepository } from '../common/repository';

export async function getAllEntries() {
  const { blogPostRepository, client } = await getRepository();
  await blogPostRepository.createIndex();
  const allBlogEntries = await blogPostRepository.search().return.all();
  await client.close();
  return allBlogEntries;
}
