import { getSupabaseClient } from '../common/factory';
import { BlogPage } from '../common/models/Page';

const endpoint = process.env.GET_ALL_INFINITE;
const table = process.env.SUPABASE_BREAD_BLOG_TABLE_INFINITE;

function createNewPage(mostRecentPage, newBlogEntry) {
  const { id } = mostRecentPage;
  const newId = id ? (id + 1) : 1;
  const created_at = new Date();
  const count = 1;
  const newNext = null;
  const newPrevious = `${endpoint}${id}`;
  const results = [newBlogEntry];
  return new BlogPage(newId, created_at, count, newNext, newPrevious, results);
}

export async function createArticle(newBlogEntry) {
  const supabase = getSupabaseClient();

  try {
    const { data } = await supabase
      .from(table)
      .select('*')
      .order('id', { ascending: true });

    const mostRecentPage = data[data.length - 1];
    const newPage = createNewPage(mostRecentPage, newBlogEntry);

    await supabase
      .from(table)
      .upsert(newPage);

  } catch (e) {
    console.error('糟了，操作失敗: ', e);
  }
}
