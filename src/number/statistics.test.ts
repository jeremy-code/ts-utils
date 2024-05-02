import { mean, median, mode, variance, standardDeviation } from "./statistics";

describe("Statistical Functions Tests", () => {
  // Tests for mean
  test("mean of no numbers should be undefined", () => {
    expect(mean()).toBeUndefined();
  });
  test("mean of numbers", () => {
    expect(mean(2, 3, 5)).toBeCloseTo(3.333, 3);
  });

  // Tests for median
  test("median of no numbers should be undefined", () => {
    expect(median()).toBeUndefined();
  });
  test("median of odd count of numbers", () => {
    expect(median(3, 1, 2)).toBe(2);
  });
  test("median of even count of numbers", () => {
    expect(median(1, 2, 3, 4)).toBe(2.5);
  });

  // Tests for mode
  test("mode of no numbers should be undefined", () => {
    expect(mode()).toBeUndefined();
  });
  test("mode of numbers with one mode", () => {
    expect(mode(1, 2, 2, 3)).toEqual([2]);
  });
  test("mode of numbers with multiple modes", () => {
    expect(mode(1, 1, 2, 2, 3)).toEqual([1, 2]);
  });

  // Tests for variance
  test("variance of no numbers should be undefined", () => {
    expect(variance()).toBeUndefined();
  });
  test("variance of numbers", () => {
    expect(variance(1, 2, 3, 4, 5, 6, 7)).toBe(4);
  });

  // Tests for standard deviation
  test("standard deviation of no numbers should be undefined", () => {
    expect(standardDeviation()).toBeUndefined();
  });
  test("standard deviation of numbers", () => {
    expect(standardDeviation(1, 2, 3, 4, 5, 6, 7)).toBe(2);
  });
});
