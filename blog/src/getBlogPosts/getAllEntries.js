import { getSupabaseClient } from '../common/factory';
import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../common/http';

export async function getAllEntries() {
  console.log('getAllEntries()');
  const supabase = getSupabaseClient();
  try {
    const { data } = await supabase
      .from(process.env.SUPABASE_BREAD_BLOG_TABLE)
      .select('*')
      .order('created_at', { ascending: false });
    const response = buildSuccessResponse(data);
    return response;
  } catch (e) {
    console.error('server broke: ', e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
