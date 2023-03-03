export const httpStatus = {
  INTERNAL_ERROR: 500,
  MISSING_ARGUMENT: 422,
  SUCCESSFUL: 200,
};

export const errorMessages = {
  INVALID_REQUEST: 'Invalid Request',
};

export const standardHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
};

export const buildSuccessResponse = (data) => ({
  statusCode: httpStatus.SUCCESSFUL,
  body: JSON.stringify(data),
  headers: standardHeaders,
});

export const buildErrorResponse = (statusCode) => ({
  statusCode,
  body: JSON.stringify({
    error: {
      errorMessage: errorMessages.INVALID_REQUEST,
    },
  }),
  headers: standardHeaders,
});
