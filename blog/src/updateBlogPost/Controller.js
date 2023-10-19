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
  console.log('updateArticleWithinRow()');
  const supabase = getSupabaseClient();

  try {
    const { data, error } = await supabase
      .from(process.env.SUPABASE_BREAD_BLOG_TABLE_INFINITE)
      .select()
      .eq('id', rowId)
      .single();

    if (error) {
      console.log('Error reading from Supabase.');
      throw error;
    }

    const updated = updateRow(payload, data);

    if (updated) {
      console.log('Update occurred: ', updated);
      const { data, error } = await supabase
        .from(process.env.SUPABASE_BREAD_BLOG_TABLE_INFINITE)
        .update(updated)
        .eq('id', rowId);
      if (error) {
        console.log('Error updating row.');
        throw error;
      }

      console.log('Entry has been updated: ', data);
      return data;
    } else {
      console.log('Entry not found.');
    }
  } catch (e) {
    console.log(`There was an error updating the entry: ${e.message}`);
  }
}
