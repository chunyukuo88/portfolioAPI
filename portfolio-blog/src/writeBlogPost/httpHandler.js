import { httpStatus } from '../common/http';
import { createEntry } from './createEntry';

export async function writeBlogPost(httpRequest) {
  console.log('writeBlogPost()');
  const blogData = JSON.parse(httpRequest.body);
  const entity = await createEntry(blogData);
  return {
    statusCode: httpStatus.SUCCESSFUL,
    body: JSON.stringify(entity),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
    },
  };
}
