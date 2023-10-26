import { getSupabaseClient } from '../common/factory';

export async function createArticle(newBlogEntry) {
  const supabase = getSupabaseClient();
  try {
    const { data } = await supabase
      .from(process.env.SUPABASE_BREAD_BLOG_TABLE_INFINITE)
      .select('*')
      .order('id', { ascending: true });

    await supabase
      .from(process.env.SUPABASE_BREAD_BLOG_TABLE_INFINITE)
      .upsert([newBlogEntry]);

  } catch (e) {
    console.error('糟了，操作失敗: ', e);
  }
}
