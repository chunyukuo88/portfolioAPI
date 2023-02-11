"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCrosswordInfo = getCrosswordInfo;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _factory = require("../../common/factory");
function getCrosswordInfo(_x) {
  return _getCrosswordInfo.apply(this, arguments);
}
function _getCrosswordInfo() {
  _getCrosswordInfo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(logger) {
    var supabase, _yield$supabase$from$, data, err, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          logger('getCrosswordInfo()');
          supabase = (0, _factory.getSupabaseClient)();
          _context.next = 4;
          return supabase.from('Crossword-Solutions').select('*');
        case 4:
          _yield$supabase$from$ = _context.sent;
          data = _yield$supabase$from$.data;
          err = _yield$supabase$from$.err;
          if (err) console.error('Error: ', err);
          response = {
            statusCode: 200,
            data: data
          };
          return _context.abrupt("return", response);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getCrosswordInfo.apply(this, arguments);
}