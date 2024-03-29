export function isPlainObject(obj: unknown) {
  if (typeof obj !== "object" || obj === null) return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return (
    Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null
  );
}
