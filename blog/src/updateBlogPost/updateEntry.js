import { getRepository } from '../common/repository';
import { buildErrorResponse, httpStatus } from '../common/http';

export async function updateEntry(entityId, blogData) {
  const { log, error } = console;
  try {
    log(`updateEntry() - entityId: ${entityId} - blogData: ${blogData}.`);
    const { blogPostRepository, client } = await getRepository();
    const targetPost = blogPostRepository.fetch(entityId);
    const updatedPost = JSON.parse(JSON.stringify(targetPost));
    const fieldsToBeUpdated = Object.keys(blogData);
    fieldsToBeUpdated.forEach((field) => {
      updatedPost[field] = blogData[field];
    });
    await blogPostRepository.save(updatedPost);
    await client.close();
    log('updateEntry() - updatedPost: ', updatedPost);
    return updatedPost;
  } catch (e) {
    error('controller error: ', e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
