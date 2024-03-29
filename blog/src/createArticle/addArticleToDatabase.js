import { getSupabaseClient } from '../common/factory';
import {
  createNewPage,
  buildNewArticle,
  articleIsInvalid,
} from './utils';
const table = process.env.SUPABASE_BREAD_BLOG_TABLE_INFINITE;

const maxArticlesPerPage = 3;

async function addArticleToExistingPage(mostRecentPage, newArticleData, supabase) {
  console.log('addArticleToExistingPage()');
  const mostRecentPageNumber = mostRecentPage.results[0].page;
  const newArticle = buildNewArticle(newArticleData, mostRecentPageNumber);
  mostRecentPage.results.push(newArticle);
  mostRecentPage.count = mostRecentPage.count + 1;

  console.log('addArticleToExistingPage() - mostRecentPage:', mostRecentPage);
  return await supabase
    .from(table)
    .upsert(mostRecentPage);
}

async function updatePreviousPage(previousPage, supabase) {
  console.log('updatePreviousPage()');
  const incrementedPageNumber = previousPage.id + 1;
  previousPage.next = `${process.env.GET_ALL_INFINITE}${incrementedPageNumber}`;

 console.log('updatePreviousPage() - previousPage: ', previousPage);
  return supabase
    .from(table)
    .update(previousPage);
}

async function addArticleToNewPage(mostRecentPage, newArticleData, supabase) {
  console.log('addArticleToNewPage()');
  const incrementedPageNumber = mostRecentPage.results[0].page + 1;
  const newArticle = buildNewArticle(newArticleData, incrementedPageNumber);
  const newPage = createNewPage(mostRecentPage, newArticle);

  console.log('addArticleToNewPage() - newPage: ', newPage);
  return await supabase
    .from(table)
    .upsert(newPage);
}

export async function addArticleToDatabase(newArticleData) {
  if (articleIsInvalid(newArticleData)) {
    return console.log('Articles is missing attributes.');
  }

  try {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from(table)
      .select('*')
      .order('id', { ascending: true });
    const mostRecentPage = data[data.length - 1];

    if (mostRecentPage.results.length < maxArticlesPerPage) {
      return await addArticleToExistingPage(mostRecentPage, newArticleData, supabase);
    }
    if (mostRecentPage.results.length === maxArticlesPerPage) {
      await updatePreviousPage(mostRecentPage, supabase);
      return await addArticleToNewPage(mostRecentPage, newArticleData, supabase);
    }
  } catch (e) {
    return console.error('糟了，操作失敗: ', e);
  }
}
