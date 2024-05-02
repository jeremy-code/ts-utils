/**
 * @file The basic statistics functions for numbers, expanding on what the Math
 * object provides. Realistically, you shouldn't need ALL of these functions,
 * but they are included for completeness. You likely want to use d3-array or
 * similar library for more complicated statistics.
 */

// min = Math.min
// max = Math.max
// range = Math.max - Math.min

// May want to extract the sum reduce() to its own function
export const mean = (...values: number[]) =>
  values.length === 0 ?
    undefined // matches standard for array functions
  : values.reduce((acc, value) => acc + value, 0) / values.length;

export const median = (...values: number[]) => {
  if (values.length === 0) return undefined;

  // .sorted is standard ES2023, using .sort() which mutates array is also fine
  const sorted = values.toSorted((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 !== 0 ?
      sorted[mid]
      // should never be undefined, for noUncheckedIndexedAccess
    : ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2;
};

export const mode = (...values: number[]) => {
  if (values.length === 0) return undefined;

  const counts = values.reduce(
    (acc, v) => acc.set(v, (acc.get(v) || 0) + 1),
    new Map<number, number>(),
  );
  const maxCount = Math.max(...counts.values());

  return Array.from(counts).reduce<number[]>(
    (acc, [value, count]) => (count === maxCount ? [...acc, value] : acc),
    [],
  );
  // alternatively, chain filter() and map() instead of reduce() for readability
  // .filter(([, count]) => count === maxCount).map(([value]) => value);

  // alternatively, use .find() if only want the first element with the highest
  // count
};

export const variance = (...values: number[]) => {
  if (values.length === 0) return undefined;

  const mean = values.reduce((acc, value) => acc + value, 0) / values.length;
  return (
    values.reduce((acc, value) => acc + (value - mean) ** 2, 0) / values.length
  );
};

// could use variance() for this calculation to simplify
export const standardDeviation = (...values: number[]) => {
  if (values.length === 0) return undefined;

  const mean = values.reduce((acc, value) => acc + value, 0) / values.length;
  const variance =
    values.reduce((acc, value) => acc + (value - mean) ** 2, 0) / values.length;

  return Math.sqrt(variance);
};
