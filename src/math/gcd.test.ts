import { describe, expect, test } from "vitest";

import { gcd } from "./gcd";

describe("gcd function", () => {
  describe("returns the greatest common divisor of two numbers", () => {
    test.each([
      [12, 18, 6],
      [18, 12, 6],
      [12, 12, 12],
      [12, 0, 12],
      [0, 12, 12],
      [0, 0, 0],
    ])("gcd(%d, %d) = %d", (a, b, expected) => {
      expect(gcd(a, b)).toBe(expected);
    });
  });

  describe("throws an error if one of the numbers is not an integer", () => {
    test.each([
      [12, 12.5],
      ["a", 12],
    ])("gcd(%d, %s)", (a, b) => {
      expect(() => gcd(a as number, b)).toThrow();
    });
  });

  test("returns 1 if coprime", () => {
    expect(gcd(2, 3)).toBe(1);
  });
});
