/**
 * Anything that isn't an object (`object` in TypeScript)
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values}
 */
export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;

// Useful for Object.keys, Object.entries, etc.
export type StringifiedPropertyKey<T extends PropertyKey> =
  T extends string ? T
  : T extends number ? `${T}`
  : never; // Symbol

// Using an accumulator for tail-recursion optimization
type Enumerate<N extends number, Acc extends number[] = []> =
  Acc["length"] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc["length"]]>;

/**
 * Ideally, type should be number, and validated at runtime, but may be useful in niche cases
 *
 * @example type Percentage = Range<1, 101>; // 1-100
 */
export type Range<From extends number, To extends number> = Exclude<
  Enumerate<To>,
  Enumerate<From>
>;

export type NumericRange = [From: number, To: number];

/**
 * Can be used to create a number of fixed length, similar to {@link Range}
 *
 * @example
 * ```ts
 * type ParseInt<T> = T extends `${infer N extends number}` ? N : never;
 * type TwoDigitNumber = ParseInt<`${Digit}` | `${Exclude<Digit, 0>}${Digit}`>;
 * ```
 */
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// prettier-ignore
type CapitalLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

type Letter = CapitalLetter | Lowercase<CapitalLetter>;

// Note: does not include special characters, e.g., punctuation, whitespace, etc.
export type Char = Letter | Digit;

/**
 * @see https://www.totaltypescript.com/concepts/the-prettify-helper
 *
 * @example
 * Alternatively, can be used without {}
 * ```ts
 * type Prettify<T> = { [K in keyof T]: T[K] } & unknown;
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types -- {} or unknown is necessary for compiler
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

declare const brand: unique symbol;

// Branded type
export type Brand<T, TBrand extends string> = T & { [brand]: TBrand };

// Types for testing (Vitest preferred)
export type Expect<T extends true> = T;
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true
  : false;

export interface Recursive<T> {
  [key: PropertyKey]: T | Recursive<T>;
}

// Opposite of NonNullable<T> global type
export type Nullable<T> = T | null | undefined;

/**
 * Alternatively, use A[number] or A[keyof A]
 *
 * @example
 * ```ts
 * const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
 * type Weekday = ArrayElement<typeof weekdays>;
 * ```
 */
export type ArrayElement<A extends readonly unknown[]> =
  A extends readonly (infer T)[] ? T : never;

export type IterableElement<I> =
  I extends Iterable<infer T> ? T
  : I extends AsyncIterable<infer T> ? T
  : never;

export type Class<T, Args extends unknown[]> = {
  prototype: Pick<T, keyof T>;
  new (...args: Args): T;
};
