"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClient = getClient;
exports.getRepository = getRepository;
exports.getSchema = getSchema;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _redisOm = require("redis-om");
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var blogSchemaDef = {
  title: {
    type: 'string'
  },
  theme: {
    type: 'string'
  },
  imageUrl: {
    type: 'string'
  },
  likes: {
    type: 'number'
  },
  views: {
    type: 'number'
  }
};
var blogSchemaOptions = {
  dataStructure: 'JSON'
};
function getClient() {
  return new _redisOm.Client();
}
var BlogPost = /*#__PURE__*/function (_Entity) {
  (0, _inherits2["default"])(BlogPost, _Entity);
  var _super = _createSuper(BlogPost);
  function BlogPost() {
    (0, _classCallCheck2["default"])(this, BlogPost);
    return _super.apply(this, arguments);
  }
  return (0, _createClass2["default"])(BlogPost);
}(_redisOm.Entity);
function getSchema() {
  var schema = new _redisOm.Schema(BlogPost, blogSchemaDef, blogSchemaOptions);
  return schema;
}
function getRepository(schema, client) {
  var repository = client.fetchRepository(schema);
  return repository;
}