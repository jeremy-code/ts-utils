import { describe, expect, test } from "vitest";

import { randomNum } from "./randomNum";

describe("randomNum", () => {
  test("generates a number within the specified range", () => {
    const min = 1;
    const max = 100;
    const result = randomNum(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});
