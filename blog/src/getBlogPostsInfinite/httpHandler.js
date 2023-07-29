import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../common/http';
import { getAllEntriesInfinite } from './getAllEntriesInfinite';

export async function handler(httpRequest) {
  const { log, error } = console;
  log('getBlogPosts/httpHandler.handler()');
  try {
    const data = await getAllEntriesInfinite(httpRequest);
    return buildSuccessResponse(data);
  } catch (e) {
    error('getBlogPosts/httpHandler.handler() - error: ', e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
