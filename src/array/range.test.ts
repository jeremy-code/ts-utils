import { describe, expect, test } from "vitest";

import { range } from "./range";

describe("range function", () => {
  test("returns a range of numbers with default step", () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  test("returns a range of numbers with specified step", () => {
    expect(range(1, 10, 2)).toEqual([1, 3, 5, 7, 9]);
  });

  test("return a range of numbers with negative step", () => {
    expect(range(5, 1, -1)).toEqual([5, 4, 3, 2, 1]);
  });

  test("returns an empty array if end is less than start with positive step", () => {
    expect(range(5, 1)).toEqual([]);
  });

  test("returns array of one element when start and end being equal", () => {
    expect(range(5, 5)).toEqual([5]);
  });
});
