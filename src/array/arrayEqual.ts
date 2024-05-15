export const arrayEqual = (value1: unknown[], value2: unknown[]) =>
  value1.length === value2.length &&
  value1.every((val, index) => Object.is(val, value2[index]));

export const nestedArrayEqual = <T>(value1: T[], value2: T[]): boolean => {
  if (value1.length !== value2.length) {
    return false;
  }

  return value1.every((val, index) => {
    // for TypeScript inference
    const value2Entry = value2[index];

    return Array.isArray(val) && Array.isArray(value2Entry) ?
        nestedArrayEqual(val, value2Entry)
      : Object.is(val, value2Entry);
  });
};
