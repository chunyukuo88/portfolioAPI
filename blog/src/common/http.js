export const httpStatus = {
  INTERNAL_ERROR: 500,
  MISSING_ARGUMENT: 422,
  SUCCESSFUL: 200,
};

export const buildSuccessResponse = (data) => ({
  statusCode: httpStatus.SUCCESSFUL,
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
  },
});

export const buildErrorResponse = (statusCode) => ({
  statusCode,
  body: JSON.stringify({
    error: {
      errorMessage: 'Invalid Request',
    },
  }),
});
