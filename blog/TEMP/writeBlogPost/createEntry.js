import { getRepository } from '../common/repository';
import { buildErrorResponse, httpStatus } from '../../src/common/http';

const invalidData = (blogData) => !blogData
  || !blogData.title
  || !blogData.creationTimeStamp
  || !blogData.theme;

export async function createEntry(blogData) {
  const { log, error } = console;
  log('createEntry()');
  if (invalidData(blogData)) {
    return buildErrorResponse(httpStatus.MISSING_ARGUMENT);
  }
  try {
    const { blogPostRepository, client } = await getRepository();
    const newEntity = await blogPostRepository.createAndSave(blogData);
    log('createEntry() - newEntity:', newEntity);
    await client.close();
    return newEntity;
  } catch (e) {
    error(`createEntry() - the error: ${e}`);
    return buildErrorResponse(httpStatus.INTERNAL_ERROR);
  }
}
