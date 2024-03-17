export const range = (start: number, end: number, step = 1) => {
  const length =
    Math.sign(step) === 1
      ? Math.max(Math.ceil((end - start + 1) / step), 0)
      : Math.max(Math.ceil((start - end + 1) / Math.abs(step)), 0);

  return Array.from({ length }, (_, index) => start + index * step);
};
