"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _factory = require("./factory");
var _controller = require("./controller");
jest.mock("./factory");
describe("GIVEN: valid blog post data,", function () {
  describe("WHEN: this function is invoked,", function () {
    it("THEN: saves the post to the database.", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var data, id;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _factory.getClient.mockReturnValueOnce({
              isOpen: function isOpen() {
                return false;
              },
              open: function open(redisDatabaseUrl) {
                return jest.fn();
              },
              close: function close() {
                return jest.fn();
              },
              fetchRepository: function fetchRepository(schema) {
                var repository = {
                  createEntity: function createEntity() {}
                };
                return repository;
              }
            });
            _factory.getSchema.mockReturnValueOnce({});
            _factory.getRepository.mockReturnValueOnce({
              createEntity: function createEntity(data) {
                var post = "some post";
                return post;
              },
              save: function save() {
                return new Promise(function (resolve, reject) {
                  var id = "some id";
                  resolve(id);
                });
              }
            });
            data = {
              title: "Test title",
              theme: "Test theme",
              imageUrl: "Test imageUrl",
              likes: 0,
              views: 0
            };
            _context.next = 6;
            return (0, _controller.createPost)(data);
          case 6:
            id = _context.sent;
            expect(id).toEqual("some id");
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
  });
});