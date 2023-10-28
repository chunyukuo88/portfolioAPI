import { v4 as uuidv4 } from 'uuid';

export function Article(title, imageUrl, body, page) {
  this.title = title; // string
  this.imageUrl = imageUrl; // string
  this.body = body; // string
  this.page = page // number

  this.articleId = uuidv4(); // string
  this.likes = 1; // number
  this.views = 1; // number
}
