import { getRepository } from '../common/repository';
import { buildErrorResponse, httpStatus } from '../../src/common/http';

export async function updateEntry(entityId, blogData) {
  const { log, error } = console;
  try {
    log(`updateEntry() 1 - entityId: ${entityId}`);
    const { blogPostRepository, client } = await getRepository();
    const targetPost = await blogPostRepository.fetch(entityId);
    Object.keys(blogData).forEach((field) => {
      targetPost[field] = blogData[field];
    });
    await blogPostRepository.save(targetPost);
    await client.close();
    return targetPost;
  } catch (e) {
    error('Forsooth! The Controller error: ', e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
