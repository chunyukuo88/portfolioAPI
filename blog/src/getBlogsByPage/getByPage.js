import { getRepository } from '../common/repository';

export async function getByPage(pageNumber) {
  const { blogPostRepository, client } = await getRepository();
  await blogPostRepository.createIndex();
  const specificBlogEntries = await blogPostRepository
    .search()
    .where('page')
    .eq(pageNumber)
    .return
    .all();
  await client.close();
  return specificBlogEntries;
}
