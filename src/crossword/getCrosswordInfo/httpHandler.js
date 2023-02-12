import * as dotenv from 'dotenv';
import { getSupabaseClient } from '../../common/factory';
import {buildErrorResponse, buildSuccessResponse, httpStatus} from '../../common/http';

dotenv.config();

export async function getCrosswordInfo() {
  console.log('getCrosswordInfo()');
  const supabase = getSupabaseClient();
  try {
    const { data } = await supabase.from('Crossword-Solutions').select('*');
    const response = buildSuccessResponse(data);
    return response;
  } catch (e) {
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}

