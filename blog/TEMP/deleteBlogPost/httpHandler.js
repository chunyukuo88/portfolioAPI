import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../../src/common/http';
import { deletePost } from './deletePost';

export async function handler(httpRequest) {
  const { log, error } = console;
  try {
    const { id } = httpRequest.pathParameters;
    const response = await deletePost(id);
    log('deleteBlogPost.handler()');
    return buildSuccessResponse(response);
  } catch (e) {
    error(e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
