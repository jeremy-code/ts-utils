import { absoluteError, relativeError } from "./relativeError";

test("relativeError", () => {
  expect(relativeError(1, 2)).toBe(0.5);
  expect(relativeError(2, 1)).toBe(1);
  expect(relativeError(0, 1)).toBe(1);
  expect(relativeError(1, 0)).toBe(Infinity);
  expect(relativeError(0, 0)).toBe(NaN);
});

test("absoluteError", () => {
  expect(absoluteError(1, 2)).toBe(1);
  expect(absoluteError(2, 1)).toBe(1);
  expect(absoluteError(0, 1)).toBe(1);
  expect(absoluteError(1, 0)).toBe(1);
  expect(absoluteError(0, 0)).toBe(0);
});
