/* eslint-disable camelcase */

export class BlogPage {
  constructor(id, created_at, count, next, previous, results) {
    this.id = id; // number
    this.created_at = created_at; // Date object
    this.count = count; // integer
    this.next = next; // string
    this.previous = previous; // string
    this.results = results; // string
  }
}

/* eslint-enable camelcase */
