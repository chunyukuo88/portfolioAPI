// import { createPost } from './controller';
import { httpStatus } from '../common/http';
import { doTheThing } from './doTheThing';

export async function writeBlogPost(httpRequest) {
  console.log('writeBlogPost - handler() 1/2');
  const blogData = JSON.parse(httpRequest.body);
  // const id = await createPost(blogData);
  const entity = await doTheThing(blogData);
  console.log('writeBlogPost - handler() 2/2');
  return {
    statusCode: httpStatus.SUCCESSFUL,
    // body: JSON.stringify(id),
    body: JSON.stringify(entity),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
    },
  };
}
