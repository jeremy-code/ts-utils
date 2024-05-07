import { assertIsError } from "./assertIsError";

describe("assertIsError function", () => {
  describe("should not throw an error when given an Error object", () => {
    it.each([
      // Error objects per https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#error_objects
      new Error(),
      new AggregateError([new Error()]),
      new EvalError(),
      new RangeError(),
      new ReferenceError(),
      new SyntaxError(),
      new TypeError(),
      new URIError(),
    ])("should not throw for %s", (error) => {
      expect(() => assertIsError(error)).not.toThrow();
    });
  });

  describe("should throw an error when given a non-Error object", () => {
    it.each([
      ["object", {}],
      ["error-like object", { name: "Error", message: "error" }],
      ["null", null],
      ["undefined", undefined],
      ["number", 0],
      ["string", "string"],
      ["boolean", true],
      ["symbol", Symbol.iterator],
    ])("should throw for %s", (_, value) => {
      expect(() => assertIsError(value)).toThrow();
    });
  });
});
