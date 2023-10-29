import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../common/http';
import { addArticleToDatabase } from './addArticleToDatabase';

export async function handler(httpRequest) {
  const { log, error } = console;
  log('createArticle/createHandler.handler()');
  try {
    const newBlogArticle = JSON.parse(httpRequest.body);
    const result = await addArticleToDatabase(newBlogArticle);
    return buildSuccessResponse(result);
  } catch (e) {
    error('createArticle/createHandler.handler() - error: ', e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}