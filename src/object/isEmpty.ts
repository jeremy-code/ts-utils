/**
 * Roughly equivalent to `lodash.isempty`, which is the 2489th most popular
 * package with 2M weekly downloads
 */

export const isEmpty = (value: unknown) => {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value) || typeof value === "string")
    return value.length === 0; // [] or ""
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  // Must be last in case of Array, Map, Set
  if (typeof value === "object") return Object.entries(value).length === 0; // {}

  return false;
};

// Using many nested ternaries rather than early return. Arguably less readable.
export const isEmpty1 = (value: unknown) =>
  value === null ||
  value === undefined ||
  (Array.isArray(value) || typeof value === "string" ? value.length === 0
  : value instanceof Map || value instanceof Set ? value.size === 0
  : typeof value === "object" ? Object.entries(value).length === 0
  : false);
