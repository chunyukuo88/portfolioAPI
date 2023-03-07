import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../common/http';
import { deletePost } from './deletePost';

export async function handler(httpRequest) {
  const { log, error } = console;
  try {
    const response = await deletePost(httpRequest);
    log('deleteBlogPost.handler()');
    return buildSuccessResponse(response);
  } catch (e) {
    error(e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
