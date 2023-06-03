import { getRepository } from '../common/repository';
import { buildErrorResponse, httpStatus } from '../common/http';

const invalidData = (blogData) => (
  !blogData
  || !blogData.title
  || !blogData.creationTimeStamp
  || !blogData.theme
  || !blogData.imageUrl
);

export async function createEntry(blogData) {
  console.log('createEntry()');
  if (invalidData(blogData)) {
    return buildErrorResponse(httpStatus.MISSING_ARGUMENT);
  }
  const { blogPostRepository, client } = await getRepository();
  const newEntity = await blogPostRepository.createAndSave(blogData);
  console.log('createEntry() - newEntity:', newEntity);
  await client.close();
  return newEntity;
}
