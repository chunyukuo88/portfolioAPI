import { getRepository } from '../common/repository';

export async function getAllEntries() {
  const databaseId = 'BlogPost';
  const { blogPostRepository, client } = await getRepository();
  const allBlogEntries = await blogPostRepository.fetch(databaseId);
  await client.close();
  return allBlogEntries;
}
