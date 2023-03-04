import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../common/http';
import { getAllEntries } from './getAllEntries';

export async function handler(httpRequest) {
  const { log } = console;
  log('getBlogPosts/httpHandler.handler()');
  try {
    const data = await getAllEntries(httpRequest);
    return buildSuccessResponse(data);
  } catch (e) {
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
