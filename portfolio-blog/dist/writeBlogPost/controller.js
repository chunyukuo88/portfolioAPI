"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPost = createPost;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _factory = require("./factory");
function createPost(_x) {
  return _createPost.apply(this, arguments);
}
function _createPost() {
  _createPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var client, schema, repository, post, id;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          client = (0, _factory.getClient)();
          _context.next = 3;
          return client.open(process.env.REDIS_PUBLIC_DB);
        case 3:
          schema = (0, _factory.getSchema)();
          repository = (0, _factory.getRepository)(schema, client);
          post = repository.createEntity(data);
          _context.next = 8;
          return repository.save(post);
        case 8:
          id = _context.sent;
          _context.next = 11;
          return client.close();
        case 11:
          return _context.abrupt("return", id);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _createPost.apply(this, arguments);
}