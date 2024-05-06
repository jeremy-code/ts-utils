/**
 * Walks up the prototype chain to find the base prototype, then compares it to
 * the original prototype. If they are the same, it is a plain object.
 *
 * Equivalent to `lodash.isplainobject`, which is the 382th most popular package with
 * 15M weekly downloads
 *
 * The signficantly easier function would be the following, but for cross-realm
 * objects, where the identity of the Object prototype is different, it would
 * fail:
 *
 * @example
 * ```ts
 * const isPlainObj = (value: unknown) =>
 *   !!value && Object.getPrototypeOf(value) === Object.prototype;
 * ```
 */
export function isPlainObject(obj: unknown) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const proto = Object.getPrototypeOf(obj) as object | null;

  // Null prototype (e.g. `Object.create(null)`)
  if (proto === null) {
    return true;
  }

  // Walks up the prototype chain to find the base prototype
  let baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto) as object;
  }

  return proto === baseProto;
}
