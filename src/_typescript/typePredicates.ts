/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#description
 *
 * Alternatively can do:
 * ```ts
 * const typeOf = (value: unknown) => typeof value; // typeof in TS !== typeof in JS, hence the need for a constant
 * type Typeof = ReturnType<typeof typeOf>;
 * ```
 */
export type Typeof =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "function";

export type TypeofType<T extends Typeof> = {
  string: string;
  number: number;
  bigint: bigint;
  boolean: boolean;
  symbol: symbol;
  undefined: undefined;
  object: object | null;
  // eslint-disable-next-line @typescript-eslint/ban-types -- Not useful, but for exhaustiveness
  function: Function; // Can be a class or a function
}[T];

// For specificity, functions like isString, isNumber, etc. can be created in
// the same way.
// Could extend even further to include others such as Array, Date, Class, etc.
export const is = <T extends Typeof>(
  value: unknown,
  type: T,
): value is TypeofType<T> => typeof value === type;

export const isObject = (value: unknown): value is object =>
  value !== null && typeof value === "object";

export const isPropertyKey = (value: unknown): value is PropertyKey =>
  typeof value === "string" ||
  typeof value === "number" ||
  typeof value === "symbol";

// Useful for template literals with certain ESLint rules such as
// https://typescript-eslint.io/rules/restrict-template-expressions
export const hasToStringTag = (
  value: unknown,
): value is object & Record<typeof Symbol.iterator, unknown> =>
  typeof value === "object" && value !== null && Symbol.toStringTag in value;
