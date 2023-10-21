import { getSupabaseClient } from '../common/factory';

function updateRow(payload, data) {
  const index = data
    .results
    .findIndex((article) => article.articleId === payload.articleId);
  if (index < 0) {
    return console.log('Target article not found, homie. Index value equals: ', index);
  }
  data.results[index] = payload;
  return data;
};

export async function updateArticleWithinRow(rowId, payload) {
  const supabase = getSupabaseClient();

  try {
    const { data, error } = await supabase
      .from(process.env.SUPABASE_BREAD_BLOG_TABLE_INFINITE)
      .select('*')
      .eq('id', rowId)
      .single();

    if (error) {
      throw error;
    }

    const updated = updateRow(payload, data);

    if (updated) {
      const { data, error } = await supabase
        .from(process.env.SUPABASE_BREAD_BLOG_TABLE_INFINITE)
        .update(updated)
        .eq('id', rowId);
      if (error) {
        throw error;
      }

      return data;
    } else {
      console.log('Entry not found.');
    }
  } catch (e) {
    console.log(`Controller: There was an error updating the entry: ${e.message}`);
  }
}
