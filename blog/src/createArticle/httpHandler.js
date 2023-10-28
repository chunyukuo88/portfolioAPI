import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../common/http';
import { createArticle } from './createArticle';

export async function handler(httpRequest) {
  const { log, error } = console;
  log('createArticle/httpHandler.handler()');
  try {
    const newBlogArticle = JSON.parse(httpRequest.body);
    await createArticle(newBlogArticle);
    return buildSuccessResponse(newBlogArticle);
  } catch (e) {
    error('createArticle/httpHandler.handler() - error: ', e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}