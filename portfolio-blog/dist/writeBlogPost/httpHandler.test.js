"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpHandler = require("./httpHandler");
var _controller = require("./controller");
var _http = require("../common/http");
jest.mock("./controller");
describe("GIVEN: A valid HTTP request containing a blog post", function () {
  describe("WHEN: this function is called", function () {
    it("THEN: publishes the post to the database.", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var redisEntryId, validBlogData, httpRequest, expectedResult, result;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            redisEntryId = 1;
            _controller.createPost.mockReturnValueOnce(redisEntryId);
            validBlogData = {
              title: "Test title",
              theme: "Test theme",
              imageUrl: "Test image URL",
              likes: 0,
              views: 0
            };
            httpRequest = {
              pathParameters: {},
              body: JSON.stringify(validBlogData)
            };
            expectedResult = {
              statusCode: _http.httpStatus.SUCCESSFUL,
              body: JSON.stringify(1),
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*"
              }
            };
            _context.next = 7;
            return (0, _httpHandler.writeBlogPost)(httpRequest);
          case 7:
            result = _context.sent;
            expect(result).toEqual(expectedResult);
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
  });
});