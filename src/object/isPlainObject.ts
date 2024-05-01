/**
 * Equivalent to `lodash.isplainobject`, which is the 382th most popular package with
 * 15M weekly downloads
 */

export function isPlainObject(obj: unknown) {
  if (typeof obj !== "object" || obj === null) return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto) as object;
  }
  return (
    Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null
  );
}
