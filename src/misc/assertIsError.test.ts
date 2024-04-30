import { assertIsError } from "./assertIsError";

test("assertIsError", () => {
  const error = new Error("test");
  expect(() => assertIsError(error)).not.toThrow();
  expect(() => assertIsError(new Error())).not.toThrow();
  expect(() => assertIsError(new SyntaxError())).not.toThrow();
  expect(() => assertIsError(new TypeError())).not.toThrow();
  expect(() => assertIsError(new RangeError())).not.toThrow();
  expect(() => assertIsError(new ReferenceError())).not.toThrow();
  expect(() => assertIsError(new URIError())).not.toThrow();
  // you get the point

  expect(() => assertIsError("foo" as unknown)).toThrow(
    "Expected an Error but got string",
  );
  expect(() => assertIsError({} as unknown)).toThrow(
    "Expected an Error but got object",
  );
  expect(() => assertIsError([] as unknown)).toThrow(
    "Expected an Error but got object",
  );
});
