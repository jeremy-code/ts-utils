export const relativeError = (actual: number, expected: number) =>
  // if expected is 0, returns NaN
  Math.abs((actual - expected) / expected);

// For completeness. Inlining the function `Math.abs(actual - expected)` is
// probably clearer
export const absoluteError = (actual: number, expected: number) =>
  Math.abs(actual - expected);
