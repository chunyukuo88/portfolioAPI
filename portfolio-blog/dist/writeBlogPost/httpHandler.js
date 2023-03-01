"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeBlogPost = writeBlogPost;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _controller = require("./controller");
var _http = require("../common/http");
function writeBlogPost(_x) {
  return _writeBlogPost.apply(this, arguments);
}
function _writeBlogPost() {
  _writeBlogPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(httpRequest) {
    var blogData, id;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          blogData = JSON.parse(httpRequest.body);
          _context.next = 3;
          return (0, _controller.createPost)(blogData);
        case 3:
          id = _context.sent;
          return _context.abrupt("return", {
            statusCode: _http.httpStatus.SUCCESSFUL,
            body: JSON.stringify(id),
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
              'Access-Control-Allow-Methods': '*'
            }
          });
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _writeBlogPost.apply(this, arguments);
}