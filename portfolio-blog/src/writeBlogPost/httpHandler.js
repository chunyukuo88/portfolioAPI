import { createPost } from './controller';
import { httpStatus } from '../common/http';

export async function writeBlogPost(httpRequest) {
  const blogData = JSON.parse(httpRequest.body);
  const id = await createPost(blogData);
  return {
    statusCode: httpStatus.SUCCESSFUL,
    body: JSON.stringify(id),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
    },
  }
}
