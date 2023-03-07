import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../common/http';
import { createEntry } from './createEntry';

export async function writeBlogPost(httpRequest) {
  const { log, error } = console;
  try {
    const blogData = JSON.parse(httpRequest.body);
    const entry = await createEntry(blogData);
    log('writeBlogPost()');
    return buildSuccessResponse(entry);
  } catch (e) {
    error(e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
