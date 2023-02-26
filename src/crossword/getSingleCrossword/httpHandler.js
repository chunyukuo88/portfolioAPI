import * as dotenv from 'dotenv';
import { getSupabaseClient } from '../../common/factory';
import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../../common/http';

dotenv.config();

export async function getSingleCrossword() {
  console.log('getSingleCrossword()');
  const supabase = getSupabaseClient();
  try {
    const { data } = await supabase
      .from(process.env.SUPABASE_CROSSWORD_TABLE)
      .select('*')
      .order('id', { ascending: false })
      .limit(1);
    const response = buildSuccessResponse(data);
    return response;
  } catch (e) {
    console.log(e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
