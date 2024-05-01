/**
 * Compare two objects one level deep (shallow comparison / Object.is)
 *
 * Roughly equivalent to npm package `shallowequal` which is the 1849th most
 * popular package with 5M weekly downloads
 *
 * Based on React's default implementation of shallowEqual
 * {@see https://github.com/facebook/react/blob/main/packages/shared/shallowEqual.js }
 */

export const shallowEqual = <T extends Record<string, unknown>>(
  obj1: T,
  obj2: T,
) => {
  if (Object.is(obj1, obj2)) return true;
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  return (
    keys1.length === keys2.length &&
    keys1.every((key) => Object.is(obj1[key], obj2[key]))
  );
};
