"use strict";

var _redisOm = require("redis-om");
var _factory = require("./factory");
describe("getClient/0", function () {
  describe("WHEN: invoked,", function () {
    it("THEN: returns a Client instance.", function () {
      var result = (0, _factory.getClient)();
      expect(result).toBeInstanceOf(_redisOm.Client);
    });
  });
});
describe("getSchema/0", function () {
  describe("WHEN: invoked,", function () {
    it("THEN: returns a Schema instance.", function () {
      var result = (0, _factory.getSchema)();
      expect(result).toBeInstanceOf(_redisOm.Schema);
    });
  });
});
describe("getRepository/2", function () {
  describe("WHEN: ", function () {
    it("THEN: ", function () {
      var mockFn = jest.fn();
      var mockSchema = {};
      var mockClient = {
        fetchRepository: mockFn
      };
      var result = (0, _factory.getRepository)(mockSchema, mockClient);
      expect(mockFn).toBeCalledTimes(1);
    });
  });
});