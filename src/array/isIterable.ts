// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol

export const isIterable = (value: unknown): value is Iterable<unknown> =>
  typeof value === "object" &&
  value !== null && // typeof null === 'object'
  Symbol.iterator in value &&
  typeof value[Symbol.iterator] === "function";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects

export const isArrayLike = (value: unknown): value is ArrayLike<unknown> =>
  typeof value === "object" &&
  value !== null && // typeof null === 'object'
  "length" in value &&
  typeof value.length === "number";
