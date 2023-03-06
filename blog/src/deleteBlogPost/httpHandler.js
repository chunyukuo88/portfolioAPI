import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../common/http';
import { deletePost } from './deletePost';

export async function handler(httpRequest) {
  const { log, error } = console;
  log('deleteBlogPost.handler()');
  const response = await deletePost(httpRequest);
  return buildSuccessResponse(response);
}
