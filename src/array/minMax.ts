// Explicit type to name tuple elements
type Range = [min: number, max: number];

/**
 * Find the minimum and maximum values in an array of numbers.
 *
 * Unlike [Math.min(), Math.max()], this function only iterates through the
 * array once, more suitable for large arrays (and prevents stack overflow
 * errors, since Math.min/max is variadic).
 *
 * @example minMax([1, 2, 3, 4, 5]) // [1, 5]
 */
export const minMax = (arr: number[]) =>
  arr.reduce<Range>(
    (acc, item) => {
      acc[0] = Math.min(acc[0], item);
      acc[1] = Math.max(acc[1], item);
      return acc;
    },
    // By default, [min, max] = [Infinity, -Infinity] to handle empty arrays
    [Infinity, -Infinity],
  );
