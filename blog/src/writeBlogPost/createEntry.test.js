import { createEntry } from "./createEntry";
import { getRepository } from "../common/repository";
import {buildErrorResponse, httpStatus} from "../common/http";

jest.mock("../common/repository");

jest.spyOn(console, 'log').mockImplementation(jest.fn());

describe("createEntry()", () => {
  describe("GIVEN: valid blog data,", () => {
    describe("WHEN: this function is invoked,", () => {
      it("THEN: it returns a new blog entity, which is returned to the handler.", async () => {
        const mockBlogEntity = {
          foo: "bar",
        };
        getRepository.mockReturnValueOnce({
          blogPostRepository: {
            createAndSave: () => {
              return mockBlogEntity;
            },
          },
          client: {
            close: jest.fn(),
          },
        });
        const blogData = {
          title: "test",
          creationTimeStamp: '1679409635239',
          theme: "test",
          imageUrl: "test",
          likes: 0,
          views: 0,
        };

        const result = await createEntry(blogData);

        expect(result).toEqual(mockBlogEntity);
      });
    });
  });
  describe("UNHAPPY PATHS: ", () => {
    describe("GIVEN: missing blog data,", () => {
      describe("WHEN: this function is invoked,", () => {
        it("THEN: it returns an error, which is returned to the handler.", async () => {
          const expectedError = new Error(
            "There was a problem removing the blog post."
          );
          getRepository.mockReturnValueOnce({
            blogPostRepository: {
              createAndSave: () => {
                throw expectedError;
              },
            },
            client: {
              close: jest.fn(),
            },
          });
          const blogData = undefined;

          const result = await createEntry(blogData);

          expect(result).toEqual(buildErrorResponse(httpStatus.MISSING_ARGUMENT));
        });
      });
    });
    describe("GIVEN: null blog data,", () => {
      describe("WHEN: this function is invoked,", () => {
        it("THEN: it returns an error, which is returned to the handler.", async () => {
          const expectedError = new Error(
            "There was a problem removing the blog post."
          );
          getRepository.mockReturnValueOnce({
            blogPostRepository: {
              createAndSave: () => {
                throw expectedError;
              },
            },
            client: {
              close: jest.fn(),
            },
          });
          const blogData = null;

          const result = await createEntry(blogData);

          expect(result).toEqual(buildErrorResponse(httpStatus.MISSING_ARGUMENT));
        });
      });
    });
    describe("GIVEN: empty blog data,", () => {
      describe("WHEN: this function is invoked,", () => {
        it("THEN: it returns an error, which is returned to the handler.", async () => {
          const expectedError = new Error(
            "There was a problem removing the blog post."
          );
          getRepository.mockReturnValueOnce({
            blogPostRepository: {
              createAndSave: () => {
                throw expectedError;
              },
            },
            client: {
              close: jest.fn(),
            },
          });
          const blogData = {};

          const result = await createEntry(blogData);

          expect(result).toEqual(buildErrorResponse(httpStatus.MISSING_ARGUMENT));
        });
      });
    });
    describe("GIVEN: blog data that is not empty but is missing fields,", () => {
      describe("WHEN: this function is invoked,", () => {
        it("THEN: it returns an error, which is returned to the handler.", async () => {
          const expectedError = new Error(
            "There was a problem removing the blog post."
          );
          getRepository.mockReturnValueOnce({
            blogPostRepository: {
              createAndSave: () => {
                throw expectedError;
              },
            },
            client: {
              close: jest.fn(),
            },
          });
          const blogData = {
            title: 'A valid title',
            creationTimeStamp: null,
            theme: undefined,
            imageUrl: 'www.example.com',
          };

          const result = await createEntry(blogData);

          expect(result).toEqual(buildErrorResponse(httpStatus.MISSING_ARGUMENT));
        });
      });
    });
  });
});
