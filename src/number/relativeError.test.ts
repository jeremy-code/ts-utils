import { describe, expect, test } from "vitest";

import { absoluteError, relativeError } from "./relativeError";

describe("relativeError function", () => {
  test("returns the relative error", () => {
    expect(relativeError(1, 2)).toBe(0.5);
    expect(relativeError(2, 1)).toBe(1);
    expect(relativeError(0, 1)).toBe(1);
  });

  test("handles division by zero", () => {
    expect(relativeError(1, 0)).toBe(Infinity);
    expect(relativeError(0, 0)).toBe(NaN);
  });
});

describe("absoluteError function", () => {
  test("returns the absolute error", () => {
    expect(absoluteError(1, 2)).toBe(1);
    expect(absoluteError(2, 1)).toBe(1);
    expect(absoluteError(0, 1)).toBe(1);
    expect(absoluteError(1, 0)).toBe(1);
    expect(absoluteError(0, 0)).toBe(0);
  });
});
