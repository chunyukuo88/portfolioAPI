import { getSupabaseClient } from '../common/factory';
import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../common/http';

export async function getAllEntriesInfinite() {
  const supabase = getSupabaseClient();
  try {
    const { data } = await supabase
      .from(process.env.SUPABASE_BREAD_BLOG_TABLE_INFINITE)
      .select('*')
      .order('created_at', { ascending: false });
    const response = buildSuccessResponse(data);
    return response;
  } catch (e) {
    console.error('server broke: ', e);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
