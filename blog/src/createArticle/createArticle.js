import { getSupabaseClient } from '../common/factory';
import {
  createNewPage,
  buildNewArticle,
  articleIsInvalid,
} from './utils';
const table = process.env.SUPABASE_BREAD_BLOG_TABLE_INFINITE;

async function getMostRecentPage(supabase) {
  const { data } = await supabase
    .from(table)
    .select('*')
    .order('id', { ascending: true });
  return data[data.length - 1];
}

async function addArticleToExistingPage(mostRecentPage, newArticleData, supabase) {
  const mostRecentPageNumber = mostRecentPage.results[0].page;
  const newArticle = buildNewArticle(newArticleData, mostRecentPageNumber);
  mostRecentPage.results.push(newArticle);
  mostRecentPage.count = mostRecentPage.count + 1;
  return await supabase
    .from(table)
    .update(mostRecentPage);
}

async function addArticleToNewPage(mostRecentPage, newArticleData, supabase) {
  console.dir(mostRecentPage);
  const incrementedPageNumber = mostRecentPage.results[0].page + 1;
  const newArticle = buildNewArticle(newArticleData, incrementedPageNumber);
  const newPage = createNewPage(mostRecentPage, newArticle);

  return await supabase
    .from(table)
    .upsert(newPage);
}

export async function createArticle(newArticleData) {
  if (articleIsInvalid(newArticleData)) {
    return console.log('Articles is missing attributes.');
  }

  try {
    const supabase = getSupabaseClient();
    const mostRecentPage = await getMostRecentPage(supabase);
    if (mostRecentPage.results.length < 3) {
      return await addArticleToExistingPage(mostRecentPage, newArticleData, supabase);
    }
    if (mostRecentPage.results.length === 3) {
      return await addArticleToNewPage(mostRecentPage, newArticleData, supabase);
    }
  } catch (e) {
    return console.error('糟了，操作失敗: ', e);
  }
}
