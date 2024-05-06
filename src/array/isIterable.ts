/**
 * Check if a value is an iterable object (implements the iterable protocol).
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol}
 *
 * @example isIterable(new Set()) // true
 */
export const isIterable = (value: unknown): value is Iterable<unknown> =>
  typeof value === "object" &&
  value !== null && // typeof null === 'object'
  Symbol.iterator in value &&
  typeof value[Symbol.iterator] === "function";

/**
 * Check if a value is an array-like object (is an object and has a length property).
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects}
 *
 * @example isArrayLike({ length: 0 }) // true
 */
export const isArrayLike = (value: unknown): value is ArrayLike<unknown> =>
  typeof value === "object" &&
  value !== null && // typeof null === 'object'
  "length" in value &&
  typeof value.length === "number";
