import { Client, Entity, Schema, Repository } from "redis-om";
import { getClient, getSchema, getRepository } from "./factory";

describe("getClient/0", () => {
  describe("WHEN: invoked,", () => {
    it("THEN: returns a Client instance.", () => {
      const result = getClient();

      expect(result).toBeInstanceOf(Client);
    });
  });
});
describe("getSchema/0", () => {
  describe("WHEN: invoked,", () => {
    it("THEN: returns a Schema instance.", () => {
      const result = getSchema();

      expect(result).toBeInstanceOf(Schema);
    });
  });
});
describe("getRepository/2", () => {
  describe("WHEN: ", () => {
    it("THEN: ", () => {
      const mockFn = jest.fn();
      const mockSchema = {};
      const mockClient = {
        fetchRepository: mockFn,
      };

      const result = getRepository(mockSchema, mockClient);

      expect(mockFn).toBeCalledTimes(1);
    });
  });
});
