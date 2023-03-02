import { getRepository } from './blogPost';
// import { connection } from './client';

export async function doTheThing(blogData) {
  const blogPostRepository = await getRepository();
  const newEntity = await blogPostRepository.createAndSave(blogData);
  return newEntity;
}
