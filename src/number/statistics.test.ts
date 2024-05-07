import { mean, median, mode, standardDeviation, variance } from "./statistics";

describe("mean function", () => {
  it("should return undefined for no numbers", () => {
    expect(mean()).toBeUndefined();
  });

  it("should return the mean of numbers", () => {
    expect(mean(1, 2, 3, 4, 5)).toBe(3);
  });

  it("should return the mean of negative numbers", () => {
    expect(mean(-1, -2, -3, -4, -5)).toBe(-3);
  });

  it("should return the mean of decimal numbers", () => {
    expect(mean(1.1, 2.2, 3.3, 4.4, 5.5)).toBeCloseTo(3.3, 1);
  });

  it("should return the mean of mixed numbers", () => {
    expect(mean(1, -2, 3, -4, 5)).toBe(0.6);
  });
});

describe("median function", () => {
  it("should return undefined for no numbers", () => {
    expect(median()).toBeUndefined();
  });

  it("should return the median of odd count of numbers", () => {
    expect(median(1, 2, 3)).toBe(2);
  });

  it("should return the median of even count of numbers", () => {
    expect(median(1, 2, 3, 4)).toBe(2.5);
  });

  it("should return the median of negative numbers", () => {
    expect(median(-1, -2, -3)).toBe(-2);
  });

  it("should return the median of decimal numbers", () => {
    expect(median(1.1, 2.2, 3.3, 4.4, 5.5)).toBe(3.3);
  });

  it("should return the median of mixed numbers", () => {
    expect(median(1, -2, 3, -4, 5)).toBe(1);
  });
});

describe("mode function", () => {
  it("should return undefined for no numbers", () => {
    expect(mode()).toBeUndefined();
  });

  it("should return the mode of numbers with one mode", () => {
    expect(mode(1, 2, 2, 3)).toEqual([2]);
  });

  it("should return the mode of numbers with multiple modes", () => {
    expect(mode(1, 1, 2, 2, 3)).toEqual([1, 2]);
  });

  it("should return the mode of negative numbers", () => {
    expect(mode(-1, -2, -2, -3)).toEqual([-2]);
  });

  it("should return the mode of decimal numbers", () => {
    expect(mode(1.1, 2.2, 2.2, 3.3, 4.4, 5.5)).toEqual([2.2]);
  });

  it("should return the mode of mixed numbers", () => {
    expect(mode(1, -2, 2, -2, 3, 3)).toEqual([-2, 3]);
  });
});

describe("standard deviation function", () => {
  it("should return undefined for no numbers", () => {
    expect(standardDeviation()).toBeUndefined();
  });

  it("should return the standard deviation of numbers", () => {
    expect(standardDeviation(1, 2, 3, 4, 5, 6, 7)).toBeCloseTo(2, 2);
  });

  it("should return the standard deviation of negative numbers", () => {
    expect(standardDeviation(-1, -2, -3, -4, -5, -6, -7)).toBeCloseTo(2, 2);
  });

  it("should return the standard deviation of decimal numbers", () => {
    expect(standardDeviation(1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7)).toBeCloseTo(
      2.2,
    );
  });

  it("should return the standard deviation of mixed numbers", () => {
    expect(standardDeviation(1, -2, 3, -4, 5, -6, 8)).toBeCloseTo(4.65);
  });
});

describe("variance function", () => {
  it("should return undefined for no numbers", () => {
    expect(variance()).toBeUndefined();
  });

  it("should return the variance of numbers", () => {
    expect(variance(1, 2, 3, 4, 5, 6, 7)).toBe(4);
  });

  it("should return the variance of negative numbers", () => {
    expect(variance(-1, -2, -3, -4, -5, -6, -7)).toBe(4);
  });

  it("should return the variance of decimal numbers", () => {
    expect(variance(1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7)).toBeCloseTo(4.8, 1);
  });

  it("should return the variance of mixed numbers", () => {
    expect(variance(1, -2, 3, -4, 5, -6, 8)).toBeCloseTo(21.6, 1);
  });
});
