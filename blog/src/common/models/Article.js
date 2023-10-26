/* eslint-disable camelcase */

export function Article(title, imageUrl, body, likes, views) {
  this.title = title; // string
  this.imageUrl = imageUrl; // string
  this.body = body; // string
  this.likes = likes; // number
  this.views = views; // number
}
