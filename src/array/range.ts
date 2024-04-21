export const range = (start: number, end: number, step = 1) => {
  const length =
    Math.sign(step) === 1
      ? Math.max(Math.ceil((end - start + 1) / step), 0)
      : // if step is negative, go backwards
        // alternatively, may be removed if not intending to use negative step
        // and can just use .toReversed() when needed
        Math.max(Math.ceil((start - end + 1) / Math.abs(step)), 0);

  /**
   * Performance-wise, new Array().map() is significantly faster than
   * Array.from(), but Array constructor is often discouraged due to weird
   * behavior
   *
   * {@see https://google.github.io/styleguide/tsguide.html#array-constructor}
   * {@see https://jsbench.me/lxlv8rn8kd}
   */

  return Array.from({ length }, (_, index) => start + index * step);
};
