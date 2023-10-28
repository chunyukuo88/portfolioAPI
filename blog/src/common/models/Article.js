import { v4 as uuidv4 } from 'uuid';

export function Article(title, imageUrl, body, page) {
  this.title = title;
  this.imageUrl = imageUrl;
  this.body = body;
  this.page = page // number

  this.articleId = uuidv4(); // string
  this.likes = 1;
  this.views = 1;
}
