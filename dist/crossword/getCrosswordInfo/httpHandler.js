"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCrosswordInfo = getCrosswordInfo;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var dotenv = _interopRequireWildcard(require("dotenv"));
var _factory = require("../../common/factory");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
dotenv.config();
function getCrosswordInfo() {
  return _getCrosswordInfo.apply(this, arguments);
}
function _getCrosswordInfo() {
  _getCrosswordInfo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var supabase, _yield$supabase$from$, data, err, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('getCrosswordInfo()');
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
          console.log('getCrosswordInfo() - response.data type: ', (0, _typeof2["default"])(response.data));
          console.log('getCrosswordInfo() - response.data: ', (0, _typeof2["default"])(response.data));
          console.dir(response);
          return _context.abrupt("return", response);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getCrosswordInfo.apply(this, arguments);
}