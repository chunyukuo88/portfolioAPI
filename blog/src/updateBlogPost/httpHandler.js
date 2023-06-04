import { updateEntry } from "./updateEntry";
import { buildSuccessResponse, errorMessages, httpStatus, standardHeaders } from "../common/http";

export async function updateBlogPost(httpRequest) {
  const { log, error } = console;
  const updatesToExistingBlog = JSON.parse(httpRequest.body);
  const { entityId } = httpRequest.pathParameters;
  const response = await updateEntry(entityId, updatesToExistingBlog);
  log(response);
  return buildSuccessResponse(response);
}
