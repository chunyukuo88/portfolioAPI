import { getSupabaseClient } from '../common/factory';
import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../common/http';

export async function Controller(rowId, payload) {
  const supabase = getSupabaseClient();

  try {
    const { data, error } = await supabase
      .from(process.env.SUPABASE_BREAD_BLOG_TABLE_INFINITE)
      .update(payload)
      .eq('id', rowId);

    if (error) {
      throw error;
    }
    if (data && data.length > 0) {
      console.log('Entry has been updated.');
    }
  } catch (e) {
    console.log(`There was an error updating the entry: ${e}`);
  }
}
