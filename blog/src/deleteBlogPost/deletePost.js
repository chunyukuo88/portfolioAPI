import { getRepository } from '../common/repository';

export async function deletePost(blogPostId) {
  const { log, error } = console;
  try {
    const { blogPostRepository, client } = await getRepository();
    await blogPostRepository.remove(blogPostId);
    await client.close();
    log('deletePost()');
    return blogPostId;
  } catch (e) {
    error(e);
    return new Error('There was a problem removing the blog post.');
  }
}
