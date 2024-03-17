// unlike [Math.min(), Math.max()], this function only iterates through the array once, more suitable for large arrays (and prevents stack overflow errors)
export const minmax = (arr: number[]) =>
  arr.reduce<[number, number]>(
    (acc, item) => {
      acc[0] = Math.min(acc[0], item);
      acc[1] = Math.max(acc[1], item);
      return acc;
    },
    [Infinity, -Infinity]
  );
