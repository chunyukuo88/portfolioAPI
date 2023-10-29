import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../common/http';
import { addArticleToDatabase } from './addArticleToDatabase';

export async function handler(httpRequest) {
  const { log, error } = console;
  log('addArticleToDatabase/httpHandler.handler()');
  try {
    const newBlogArticle = JSON.parse(httpRequest.body);
    await addArticleToDatabase(newBlogArticle);
    return buildSuccessResponse(newBlogArticle);
  } catch (e) {
    error('addArticleToDatabase/httpHandler.handler() - error: ', e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}