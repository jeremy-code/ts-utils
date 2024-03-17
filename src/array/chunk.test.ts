import { chunk, chunk1 } from "./chunk";

describe("chunk and chunk1 functions", () => {
  describe("chunk function", () => {
    test("should correctly chunk an array of integers", () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    test("should return the original array wrapped in an array if size is greater than array length", () => {
      expect(chunk([1, 2, 3], 4)).toEqual([[1, 2, 3]]);
    });

    test("should return an empty array when input is an empty array", () => {
      expect(chunk([], 2)).toEqual([]);
    });

    test("should handle arrays of strings", () => {
      expect(chunk(["a", "b", "c", "d"], 2)).toEqual([
        ["a", "b"],
        ["c", "d"],
      ]);
    });

    test("should handle size of 1", () => {
      expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
    });
  });

  describe("chunk1 function", () => {
    test("should correctly chunk an array of integers", () => {
      expect(chunk1([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    test("should return the original array wrapped in an array if size is greater than array length", () => {
      expect(chunk1([1, 2, 3], 4)).toEqual([[1, 2, 3]]);
    });

    test("should return an empty array when input is an empty array", () => {
      expect(chunk1([], 2)).toEqual([]);
    });

    test("should handle arrays of strings", () => {
      expect(chunk1(["a", "b", "c", "d"], 2)).toEqual([
        ["a", "b"],
        ["c", "d"],
      ]);
    });

    test("should handle size of 1", () => {
      expect(chunk1([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
    });
  });
});
