import { v4 as createUniqueId } from 'uuid';

const endpoint = process.env.GET_ALL_INFINITE;

export function createNewPage(mostRecentPage, newBlogArticle) {
  const id = mostRecentPage.id
    ? mostRecentPage.id + 1
    : 1;
  const created_at = new Date();
  created_at.setMilliseconds(0);
  const count = 1;
  const next = null;
  const previous = mostRecentPage.id ? `${endpoint}${mostRecentPage.id}` : null;
  const results = [newBlogArticle];
  return { id, created_at, count, next, previous, results };
}

export function buildNewArticle(newArticleData, page) {
  const { title, imageUrl, body } = newArticleData;
  return {
    title,
    imageUrl,
    body,
    page,
    articleId: createUniqueId(),
    likes: 1,
    views: 1,
  }
}

export function articleIsInvalid(newArticleData) {
  let isInvalid = false;
  const articleKeys = Object.keys(newArticleData);
  for (let i = 0; i < articleKeys.length; i++) {
    const value = newArticleData[articleKeys[i]];
    if (!value) {
      isInvalid = true;
      break;
    }
  }
  return isInvalid;
}