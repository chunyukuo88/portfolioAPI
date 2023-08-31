import { getSupabaseClient } from '../common/factory';
import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../common/http';

export async function getAllEntriesInfinite(currentPageId) {
  const supabase = getSupabaseClient();

  const getMostRecentPage = async () => {
    const { data } = await supabase
      .from(process.env.SUPABASE_BREAD_BLOG_TABLE_INFINITE)
      .select('*')
      .order('id', { ascending: true });
    return data[data.length - 1];
  };

  const getPageById = async (id) => {
    const { data } = await supabase
      .from(process.env.SUPABASE_BREAD_BLOG_TABLE_INFINITE)
      .select('*')
      .eq('id', parseInt(id, 10));
    return data;
  };

  try {
    const response = currentPageId
      ? await getPageById(currentPageId)
      : await getMostRecentPage();
    return buildSuccessResponse(response);
  } catch (e) {
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
