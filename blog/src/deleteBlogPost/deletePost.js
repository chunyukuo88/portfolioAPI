import { getRepository } from '../common/repository';

export async function deletePost(blogPostId) {
  console.log(blogPostId);
  const { blogPostRepository, client } = await getRepository();
  await blogPostRepository.remove(blogPostId);
  await client.close();
  return blogPostId;
}
