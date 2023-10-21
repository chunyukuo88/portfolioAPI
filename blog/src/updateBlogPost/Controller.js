import { getSupabaseClient } from '../common/factory';

function updateRow(payload, data) {
  console.log('updateRow : 0');
  const index = data
    .results
    .findIndex((article) => article.articleId === payload.articleId);
  console.log('updateRow 1: index - ', index);
  if (!index) return;
  console.log('updateRow 2');
  data.results[index] = payload;
  return data;
};

export async function updateArticleWithinRow(rowId, payload) {
  console.log('updateArticleWithinRow()');
  const supabase = getSupabaseClient();

  try {
    const { data, error } = await supabase
      .from(process.env.SUPABASE_BREAD_BLOG_TABLE_INFINITE)
      .select('*')
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
    console.log(`Controller: There was an error updating the entry: ${e.message}`);
  }
}
