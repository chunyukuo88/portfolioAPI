import {
  buildErrorResponse,
  buildSuccessResponse,
  httpStatus,
} from '../common/http';
import { getSupabaseClient } from '../common/factory';

function updateRow(payload, data) {
  const index = data
    .results
    .findIndex((article) => article.title === payload.title);
  if (!index) return;
  data.results[index] = payload;
  return data;
};

export async function updateArticleWithinRow(rowId, payload) {
  const supabase = getSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('your_table')
      .select()
      .eq('id', rowId)
      .single();

    if (error) {
      throw error;
    }

    const updated = updateRow(payload, data);

    if (updated) {
      console.log('Entry has been updated.');
      return updated;
    } else {
      console.log('Entry not found.');
    }
  } catch (e) {
    console.log(`There was an error updating the entry: ${e}`);
  }
}
