import { minMax } from "./minMax";

describe("minmax function tests", () => {
  test("finds min and max in an array of positive numbers", () => {
    const result = minMax([1, 2, 3, 4, 5]);
    expect(result).toEqual([1, 5]);
  });

  test("finds min and max in an array of negative numbers", () => {
    const result = minMax([-1, -2, -3, -4, -5]);
    expect(result).toEqual([-5, -1]);
  });

  test("finds min and max in an array of mixed numbers", () => {
    const result = minMax([-2, 1, 3, -4, 5]);
    expect(result).toEqual([-4, 5]);
  });

  test("finds min and max in an array with repeating numbers", () => {
    const result = minMax([2, 2, 2]);
    expect(result).toEqual([2, 2]);
  });

  test("finds min and max in a single-element array", () => {
    const result = minMax([1]);
    expect(result).toEqual([1, 1]);
  });

  test("returns Infinity and -Infinity for an empty array", () => {
    const result = minMax([]);
    expect(result).toEqual([Infinity, -Infinity]);
  });
});
