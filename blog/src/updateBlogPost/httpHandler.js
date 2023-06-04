import { updateEntry } from './updateEntry';
import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../common/http';

export async function updateBlogPost(httpRequest) {
  const { log, error } = console;
  try {
    const updatesToExistingBlog = JSON.parse(httpRequest.body);
    const { entityId } = httpRequest.pathParameters;
    const response = await updateEntry(entityId, updatesToExistingBlog);
    log(response);
    return buildSuccessResponse(response);
  } catch (e) {
    error(e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
