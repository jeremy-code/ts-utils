export const isEmpty = (value: unknown) => {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (typeof value === "object") return Object.entries(value).length === 0;

  return false;
};
