"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.httpStatus = exports.buildSuccessResponse = exports.buildErrorResponse = void 0;
var httpStatus = {
  INTERNAL_ERROR: 500,
  MISSING_ARGUMENT: 422,
  SUCCESSFUL: 200
};
exports.httpStatus = httpStatus;
var buildSuccessResponse = function buildSuccessResponse(data) {
  return {
    statusCode: httpStatus.SUCCESSFUL,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*'
    }
  };
};
exports.buildSuccessResponse = buildSuccessResponse;
var buildErrorResponse = function buildErrorResponse(statusCode) {
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      error: {
        errorMessage: 'Invalid Request'
      }
    })
  };
};
exports.buildErrorResponse = buildErrorResponse;