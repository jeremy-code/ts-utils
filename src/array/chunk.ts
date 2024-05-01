// immutable approach
export const chunk = <T>(items: T[], size: number) =>
  items.reduce<T[][]>((arr, item, i) => {
    return i % size === 0 ?
        [...arr, [item]]
      : [...arr.slice(0, -1), [...(arr.slice(-1)[0] || []), item]];
  }, []);

// mutable approach, slightly faster and cleaner code
export const chunk1 = <T>(items: T[], size: number) => {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
};
