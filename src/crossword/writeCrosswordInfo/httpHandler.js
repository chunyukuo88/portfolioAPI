import { getSupabaseClient } from '../../common/factory';
import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../../common/http';

const missingArgument = (httpRequest) => (!httpRequest || !httpRequest.body);

export async function writeCrosswordInfo(httpRequest) {
  if (missingArgument(httpRequest)) return buildErrorResponse(httpStatus.MISSING_ARGUMENT);
  console.log('writeCrosswordInfo()');
  try {
    const supabase = getSupabaseClient();
    const newCrosswordData = JSON.parse(httpRequest.body);
    await supabase
      .from('Crossword-Solutions')
      .insert(newCrosswordData);
    return buildSuccessResponse([]);
  } catch (e) {
    console.error(e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}