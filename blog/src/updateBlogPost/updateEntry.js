import { getRepository } from '../common/repository';
import { buildErrorResponse, httpStatus } from '../common/http';

function mapUpdatesToPost(targetPost, blogData) {
  const updatedPost = JSON.parse(JSON.stringify(targetPost));
  const fieldsToBeUpdated = Object.keys(blogData);
  fieldsToBeUpdated.forEach((field) => {
    updatedPost[field] = blogData[field];
  });
  return updatedPost;
}

export async function updateEntry(entityId, blogData) {
  const { log, error } = console;
  try {
    log(`updateEntry() 1 - entityId: ${entityId} - blogData: ${blogData}.`);
    const { blogPostRepository, client } = await getRepository();
    const targetPost = await blogPostRepository.fetch(entityId);
    const updatedPost = mapUpdatesToPost(targetPost, blogData);
    await blogPostRepository.save(updatedPost);
    await client.close();
    log('updateEntry() 2 - updatedPost: ', updatedPost);
    return updatedPost;
  } catch (e) {
    error('Forsooth! The Controller error: ', e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
