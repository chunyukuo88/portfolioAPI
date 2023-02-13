"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCrosswordInfo = getCrosswordInfo;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _factory = require("../../common/factory");
var _http = require("../../common/http");
function getCrosswordInfo() {
  return _getCrosswordInfo.apply(this, arguments);
}
function _getCrosswordInfo() {
  _getCrosswordInfo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var supabase, _yield$supabase$from$, data, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('getCrosswordInfo()');
          supabase = (0, _factory.getSupabaseClient)();
          _context.prev = 2;
          _context.next = 5;
          return supabase.from('Crossword-Solutions').select('*');
        case 5:
          _yield$supabase$from$ = _context.sent;
          data = _yield$supabase$from$.data;
          response = (0, _http.buildSuccessResponse)(data);
          return _context.abrupt("return", response);
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", (0, _http.buildErrorResponse)(_http.httpStatus.INTERNAL_ERROR));
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 11]]);
  }));
  return _getCrosswordInfo.apply(this, arguments);
}