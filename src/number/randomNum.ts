/**
 * Generates a random integer between min and max (inclusive) using Math.random.
 *
 * Some may use Math.round (e.g. `Math.round(Math.random() * (max - min) +
 * min)`) but this skews the distribution.
 *
 * @example randomNum(1,6) // 4
 */
export const randomNum = (min: number, max: number) =>
  Math.floor(
    Math.random() *
      // Remove `+ 1` to make the max exclusive
      (Math.floor(max) - Math.ceil(min) + 1) +
      Math.ceil(min),
  );
