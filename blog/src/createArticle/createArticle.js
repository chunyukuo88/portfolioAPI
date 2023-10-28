import { getSupabaseClient } from '../common/factory';
import { BlogPage } from '../common/models/Page';

const endpoint = process.env.GET_ALL_INFINITE;
const table = process.env.SUPABASE_BREAD_BLOG_TABLE_INFINITE;

function createNewPage(mostRecentPage, newBlogArticle) {
  const { id } = mostRecentPage;
  const newId = id ? (id + 1) : 1;
  const created_at = new Date();
  const count = 1;
  const newNext = null;
  const newPrevious = `${endpoint}${id}`;
  const results = [newBlogArticle];
  return new BlogPage(newId, created_at, count, newNext, newPrevious, results);
}

const articleIsInvalid = (newBlogArticle) => {
  let isInvalid = false;
  const articleKeys = Object.keys(newBlogArticle);
  for (let i = 0; i < articleKeys.length; i++) {
    const value = newBlogArticle[articleKeys[i]];
    if (!value) {
      isInvalid = true;
      break;
    }
  }
  return isInvalid;
}

export async function createArticle(newBlogArticle) {
  console.log('0');
  if (articleIsInvalid(newBlogArticle)) {
    return console.log('Articles is missing attributes.');
  }

  try {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from(table)
      .select('*')
      .order('id', { ascending: true });

    const mostRecentPage = data[data.length - 1];
    if (mostRecentPage.results.length < 3) {
      mostRecentPage.results.push(newBlogArticle);
      mostRecentPage.count = mostRecentPage.count + 1;
      return await supabase
        .from(table)
        .update(mostRecentPage);
    }
    if (mostRecentPage.results.length === 3) {
      console.log('mmmm');
      const newPage = createNewPage(mostRecentPage, newBlogArticle);

      return await supabase
        .from(table)
        .upsert(newPage);
    }
  } catch (e) {
    return console.error('糟了，操作失敗: ', e);
  }
}
