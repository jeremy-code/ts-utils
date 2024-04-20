// anything that isn't an object
export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;

// alternatively, PropertyKey | bigint | boolean | null | undefined

// using Acc for tail end recursion for performance
type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

// ideally, should be validated at runtime rather and just use number as type for compile-time
export type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

// can be used to get types such as 1-100
// type Percentage = Range<1, 101>;

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// prettier-ignore
type CapitalLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

type Letter = CapitalLetter | Lowercase<CapitalLetter>;

// does not work with unicode characters, punctuations, empty string, or spaces
export type Char = Letter | Digit;

// eslint-disable-next-line @typescript-eslint/ban-types
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

// depending on use case, you may want key: PropertyKey or key: string | number
export interface Recursive<T> {
  [key: string]: T | Recursive<T>;
}

export type Nullable<T> = T | null | undefined;

// alternatively, use A[number] or A[keyof A]
export type ArrayElement<A extends readonly unknown[]> =
  A extends readonly (infer T)[] ? T : never;

// note can be used to get something like this
// const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
// type Weekday = ArrayElement<typeof weekdays>

export type IterableElement<I> =
  I extends Iterable<infer T>
    ? T
    : I extends AsyncIterable<infer T>
      ? T
      : never;

export type Class<T, A extends unknown[]> = {
  prototype: Pick<T, keyof T>;
  new (...args: A): T;
};
