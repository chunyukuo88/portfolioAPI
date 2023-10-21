import { updateArticleWithinRow } from './Controller';
import { buildErrorResponse, buildSuccessResponse, httpStatus } from '../common/http';

export async function handler(httpRequest) {
  console.log('handler() ');
  try {
    const entityId = httpRequest.pathParameters.entityId;
    console.log('entityId: ', entityId);
    const data = await updateArticleWithinRow(entityId, httpRequest.body);
    console.log('data: ', data);
    return buildSuccessResponse(data);
  } catch (e) {
    console.error('updateBlogPosts/httpHandler.handler() - error!: ', e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
