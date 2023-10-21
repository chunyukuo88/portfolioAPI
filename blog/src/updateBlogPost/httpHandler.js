import { updateArticleWithinRow } from './Controller';
import { buildErrorResponse, buildSuccessResponse, httpStatus } from '../common/http';

export async function handler(httpRequest) {
  const payload = JSON.parse(httpRequest.body);
  try {
    const entityId = httpRequest.pathParameters.entityId;
    const data = await updateArticleWithinRow(entityId, payload);
    return buildSuccessResponse(data);
  } catch (e) {
    console.error('handler/error: ', e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
