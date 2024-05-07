import { minMax } from "./minMax";

describe("minmax function", () => {
  it("returns min and max in an array of positive numbers", () => {
    expect(minMax([1, 2, 3, 4, 5])).toEqual([1, 5]);
  });

  it("returns min and max in an array of negative numbers", () => {
    expect(minMax([-1, -2, -3, -4, -5])).toEqual([-5, -1]);
  });

  it("returns min and max in an array of mixed numbers", () => {
    expect(minMax([-2, 1, 3, -4, 5])).toEqual([-4, 5]);
  });

  it("returns min and max in an array with repeating numbers", () => {
    expect(minMax([2, 2, 2])).toEqual([2, 2]);
  });

  it("returns min and max in a single-element array", () => {
    expect(minMax([1])).toEqual([1, 1]);
  });

  it("returns Infinity and -Infinity for an empty array", () => {
    expect(minMax([])).toEqual([Infinity, -Infinity]);
  });
});
