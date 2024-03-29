/* eslint-disable camelcase */

/**
 * MODEL only; instantiate via the function in utils.js instead.
 * */
export function BlogPage(id, created_at, count, next, previous, results) {
  this.id = id; // number
  this.created_at = created_at; // Date object
  this.count = count; // integer
  this.next = next; // string
  this.previous = previous; // string
  this.results = results; // string representing a string of Article objects
}

/* eslint-enable camelcase */
