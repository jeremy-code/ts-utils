export const shallowCompare = <T extends Record<string, unknown>>(
  obj1: T,
  obj2: T
) => {
  if (Object.is(obj1, obj2)) return true;
  if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) return false;

  const entries1 = Object.entries(obj1);
  const entries2 = Object.entries(obj2);

  return (
    entries1.length === entries2.length &&
    !entries1.some(([key, value]) => obj2[key] !== value)
  );
};
