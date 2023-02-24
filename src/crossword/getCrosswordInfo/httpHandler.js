import { getSupabaseClient } from '../../common/factory';
import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../../common/http';

export async function getCrosswordInfo() {
  console.log('getCrosswordInfo()');
  const supabase = getSupabaseClient();
  try {
    const { data } = await supabase.from(process.env.SUPABASE_CROSSWORD_TABLE).select('*');
    const response = buildSuccessResponse(data);
    return response;
  } catch (e) {
    console.error('server broke');
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
