import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../common/http';
import { getRepository } from '../common/repository';

export async function deletePost(blogPostId) {
  const { log, error } = console;
  try {
    const { blogPostRepository, client } = await getRepository();
    await blogPostRepository.remove(blogPostId);
    await client.close();
    log('deletePost()');
    return buildSuccessResponse(blogPostId);
  } catch (e) {
    error(e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
