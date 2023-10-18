import { updateArticleWithinRow } from './Controller';
import {buildErrorResponse, buildSuccessResponse, httpStatus} from "../common/http";

export async function handler(httpRequest) {
  try {
    const currentPageId = httpRequest.pathParameters.currentPageId;
    const data = await updateArticleWithinRow(currentPageId, httpRequest.body);
    return buildSuccessResponse(data);
  } catch (e) {
    console.error('updateBlogPosts/httpHandler.handler() - error!: ', e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
