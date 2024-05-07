import { formatOrdinal } from "./formatOrdinal";

describe("formatOrdinal function", () => {
  describe("correctly appends ordinal suffix to numbers", () => {
    it.each([
      [1, "1st"],
      [2, "2nd"],
      [3, "3rd"],
      [4, "4th"],
      [11, "11th"],
      [21, "21st"],
      [22, "22nd"],
      [23, "23rd"],
      [24, "24th"],
      [101, "101st"],
      [111, "111th"],
      [121, "121st"],
      [1_234_567_890, "1,234,567,890th"],
    ])("correctly appends ordinal suffix to %i", (input, expected) => {
      expect(formatOrdinal(input, "en")).toBe(expected);
    });
  });

  describe("handles edge cases correctly", () => {
    it.each([
      [0, "0th"],
      [-1, "-1st"],
      [-2, "-2nd"],
      [NaN, "NaNth"],
      [Infinity, "∞th"],
      [-Infinity, "-∞th"],
    ])("handles edge cases correctly for %s", (input, expected) => {
      expect(formatOrdinal(input, "en")).toBe(expected);
    });
  });
});
