# ts-utils [![GitHub Actions badge](https://github.com/jeremy-code/ts-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremy-code/ts-utils/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/jeremy-code/ts-utils)](LICENSE)

# Table of Contents

- [string](#string)
  - [capitalize.ts](#capitalizets)
  - [randomString.ts](#randomStringts)
  - [segment.ts](#segmentts)
  - [truncateMiddle.ts](#truncateMiddlets)
- [object](#object)
  - [isEmpty.ts](#isEmptyts)
  - [isPlainObject.ts](#isPlainObjectts)
  - [jsonStringifyMap.ts](#jsonStringifyMapts)
  - [parseFormData.ts](#parseFormDatats)
  - [parseUrlSearchParams.ts](#parseUrlSearchParamsts)
  - [shallowEqual.ts](#shallowEqualts)
- [number](#number)
  - [randomNum.ts](#randomNumts)
  - [relativeError.ts](#relativeErrorts)
- [misc](#misc)
  - [assertIsError.ts](#assertIsErrorts)
  - [assertNever.ts](#assertNeverts)
  - [createRangeMapper.ts](#createRangeMapperts)
- [function](#function)
  - [debounce.ts](#debouncets)
  - [sleep.ts](#sleepts)
  - [throttle.ts](#throttlets)
- [formatting](#formatting)
  - [formatBytes.ts](#formatBytests)
  - [formatNumber.ts](#formatNumberts)
  - [formatOrdinal.ts](#formatOrdinalts)
  - [uri.ts](#urits)
- [color](#color)
  - [color.ts](#colorts)
- [array](#array)
  - [chunk.ts](#chunkts)
  - [isIterable.ts](#isIterablets)
  - [minMax.ts](#minMaxts)
  - [range.ts](#rangets)

## string

### capitalize.ts

```typescript
// Equivalent to utility types Capitalize<T> and Uncapitalize<T>

// Preference for .charAt() over array indexing [] in case of empty string ""

export const capitalize = <T extends string>(str: T) =>
  `${str.charAt(0).toUpperCase()}${str.substring(1)}` as Capitalize<T>;

export const capitalize1 = ([first, ...rest]: string) =>
  `${(first ?? "").toUpperCase()}${rest.join("")}`;

export const capitalize2 = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const uncapitalize = <T extends string>(str: T) =>
  `${str.charAt(0).toLowerCase()}${str.substring(1)}` as Uncapitalize<T>;
```

### randomString.ts

````typescript
const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * For flexibility and/or to flex, CHARACTERS can be generated programmatically
 *
 * @example
 * ```ts
 * const CHARACTERS = Array.from(
 *   { length: 62 }, // 26 + 26 + 10
 *   (_, i) =>
 *     i < 26
 *       ? String.fromCharCode(i + 65) // uppercase letters ('A' = 65)
 *       : i < 52 // 26 + 26
 *         ? String.fromCharCode(i + 71) // lowercase letters ('a' = 97)
 *         : String.fromCharCode(i - 4), // numbers ('0' = 48)
 * ).join("");
 * ```
 */

export const randomString = (length: number, characters = CHARACTERS) =>
  Array.from(
    // using crypto.getRandomValues() for better randomness/security
    crypto.getRandomValues(new Uint8Array(length)),
    (byte) => characters[byte % characters.length],
  ).join("");
````

### segment.ts

```typescript
/**
 * Using Intl.Segmenter to segment a string into an array of substrings, either
 * by grapheme, word, or sentence. Effectively, a way more reliable way of doing
 * input.split(""), input.split(" "), or input.split(".") respectively. (since
 * those methods are not reliable for all languages).
 */

// default option is to segment by grapheme (letter for alphabetical scripts)
export const segment = (
  input: string,
  ...[locales, options]: ConstructorParameters<typeof Intl.Segmenter>
) =>
  Array.from(new Intl.Segmenter(locales, options).segment(input)).map(
    (s) => s.segment,
  );

// segment by word
// it filters out non-word-like segments (e.g. punctuation marks)
// more reliable than input.split(" ")
export const segmentByWord = (
  input: string,
  // if not interested in locale-specific word segmentation, may be ommitted and
  // just set locale to undefined and do not provide options
  locales?: Intl.LocalesArgument,
  options?: Omit<Intl.SegmenterOptions, "granularity">,
) =>
  Array.from(
    new Intl.Segmenter(locales, {
      granularity: "word",
      ...options,
    }).segment(input),
  )
    // alternatively can use .reduce() to do so in single iteration
    // e.g. arr.reduce((acc, s) => (s.isWordLike ? [...acc, s.segment] : acc), [])
    .filter((s) => s.isWordLike)
    .map((s) => s.segment);
```

### truncateMiddle.ts

```typescript
// use text-overflow: ellipsis in CSS if truncating text in the middle is not necessary

export const truncateMiddle = (
  text: string,
  maxLength: number,
  // may want to set default placeholder to "…" (unicode ellipsis character)
  // instead of "..." (three dots)
  placeholder = "...",
) =>
  text.length > maxLength ?
    text.slice(0, Math.ceil((maxLength - placeholder.length) / 2)) +
    placeholder +
    text.slice(-Math.floor((maxLength - placeholder.length) / 2))
  : text;
```

## object

### isEmpty.ts

```typescript
/**
 * Equivalent to `lodash.isempty`, which is the 2489th most popular package with
 * 2M weekly downloads
 */

export const isEmpty = (value: unknown) => {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value) || typeof value === "string")
    return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  // must be last in case of Array, Map, Set
  if (typeof value === "object") return Object.entries(value).length === 0;

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
```

### isPlainObject.ts

```typescript
/**
 * Equivalent to `lodash.isplainobject`, which is the 382th most popular package with
 * 15M weekly downloads
 */

export function isPlainObject(obj: unknown) {
  if (typeof obj !== "object" || obj === null) return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto) as object;
  }
  return (
    Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null
  );
}
```

### jsonStringifyMap.ts

```typescript
/**
 * Unfortunately, JSON.stringify does not support Native ES6 Map. A proposal was
 * made {@link https://github.com/DavidBruant/Map-Set.prototype.toJSON} but was
 * rejected in favor of a custom replacer function.
 *
 * An alternative is to extend the Map object with a custom toJSON() method, but
 * extending native JS objects is not recommended.
 *
 * Since this can be implemented in many different ways, here is an opinionated
 * implementation with a replacer and a reviver function.
 *
 * Note that while this is also true for Set, converting between Set and Array
 * is trivial (Array.from(set) and new Set(arr)), which is probably more
 * efficient than a replacer/reviver.
 */

type ObjectifiedMap = {
  type: "Map";
  value: [unknown, unknown][];
};

// Type predicate to check if an object is an ObjectifiedMap
// If only parsing internal data, a cast may be more appropriate
const isObjectifiedMap = (value: unknown): value is ObjectifiedMap =>
  typeof value === "object" &&
  value !== null &&
  "type" in value &&
  value.type === "Map" &&
  "value" in value &&
  Array.isArray(value.value);

// Using unknown rather than the default any for value. Doesn't make a
// difference besides avoiding implicit any
export const mapReplacer = (_key: string, value: unknown) =>
  value instanceof Map ?
    {
      type: "Map",
      value: Array.from(value),
    }
  : value;

export const mapReviver = (_key: string, value: unknown) =>
  isObjectifiedMap(value) ? new Map(value.value) : value;
```

### parseFormData.ts

```typescript
export const parseFormData = (formData: FormData) =>
  Array.from(formData).reduce<
    Record<string, FormDataEntryValue | FormDataEntryValue[]>
  >((acc, [k, v]) => {
    if (!acc[k]) {
      const values = formData.getAll(k);
      acc[k] = values.length > 1 ? values : v;
    }
    return acc;
  }, {});
```

### parseUrlSearchParams.ts

```typescript
export const parseUrlSearchParams = (urlSearchParams: URLSearchParams) =>
  Array.from(urlSearchParams).reduce<Record<string, string | string[]>>(
    (acc, [k, v]) => {
      if (!acc[k]) {
        const values = urlSearchParams.getAll(k);
        acc[k] = values.length > 1 ? values : v;
      }
      return acc;
    },
    {},
  );
```

### shallowEqual.ts

```typescript
/**
 * Compare two objects one level deep (shallow comparison / Object.is)
 *
 * Roughly equivalent to npm package `shallowequal` which is the 1849th most
 * popular package with 5M weekly downloads
 *
 * Based on React's default implementation of shallowEqual
 * {@see https://github.com/facebook/react/blob/main/packages/shared/shallowEqual.js }
 */

export const shallowEqual = <T extends Record<string, unknown>>(
  obj1: T,
  obj2: T,
) => {
  if (Object.is(obj1, obj2)) return true;
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  return (
    keys1.length === keys2.length &&
    keys1.every((key) => Object.is(obj1[key], obj2[key]))
  );
};
```

## number

### randomNum.ts

```typescript
// random number between min and max (inclusive)
export const randomNum = (min: number, max: number) =>
  Math.floor(
    Math.random() *
      // remove + 1 to make the max exclusive
      (Math.floor(max) - Math.ceil(min) + 1) +
      Math.ceil(min),
  );
```

### relativeError.ts

```typescript
export const relativeError = (actual: number, expected: number) =>
  // if expected is 0, returns NaN
  Math.abs((actual - expected) / expected);

// for completeness, inlining the function `Math.abs(actual - expected)` is
// probably clearer
export const absoluteError = (actual: number, expected: number) =>
  Math.abs(actual - expected);
```

## misc

### assertIsError.ts

```typescript
export function assertIsError(error: unknown): asserts error is Error {
  if (!(error instanceof Error)) {
    throw new Error(`Expected an Error but got ${typeof error}`, {
      cause: error,
    });
  }
}
```

### assertNever.ts

```typescript
export function assertNever(value: never, message?: string): never {
  throw new Error(message ?? `Unexpected value: ${JSON.stringify(value)}`, {
    cause: value,
  });
}
```

### createRangeMapper.ts

```typescript
// start inclusive, end exclusive
type Range = [start: number, end: number];

export const createRangeMapper = <T extends PropertyKey>(
  map: Record<T, Range>,
) => {
  return (value: number) => {
    const entry = Object.entries<Range>(map).find(([, [start, end]], i) =>
      i === 0 ?
        // inclusive of start and end on first entry (e.g. on A: [0, 100], 100 would be an A)
        value >= start && value <= end
      : start <= value && value < end,
    );

    if (!entry) {
      throw new Error(`Invalid value with no corresponding range: ${value}`, {
        cause: { map, value },
      });
    }

    return entry[0] as T;
  };
};
```

## function

### debounce.ts

```typescript
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  ms?: number,
  immediate?: boolean,
) {
  let timeoutId: NodeJS.Timeout | undefined;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const later = () => {
      timeoutId = undefined;
      if (!immediate) callback.apply(this, args);
    };

    const callNow = immediate && timeoutId === undefined;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, ms);

    if (callNow) callback.apply(this, args);
  };
}
```

### sleep.ts

```typescript
export const sleep = (ms?: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
```

### throttle.ts

```typescript
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  ms: number,
  immediate?: boolean,
) {
  let lastTime = immediate ? -ms : 0;

  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastTime >= ms) {
      callback(...args);
      lastTime = now;
    }
  };
}
```

## formatting

### formatBytes.ts

```typescript
/**
 * @file Functions to format bytes into human-readable strings using
 * Intl.NumberFormat. A lot of implementations use some kind of number division
 * and modulo to determine the appropriate unit, but this is more flexible
 * depending on locale.
 *
 * Since each unit multiple is considered a separate unit, we have to manually
 * determine the appropriate unit and corresponding value, otherwise we get
 * formatting such as "1 BB" instead of "1 GB". */

/**
 * Per {@link https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers},
 * these are the valid byte units supported by the `Intl.NumberFormat` API.
 */
const UNITS = [
  "byte",
  "kilobyte",
  "megabyte",
  "gigabyte",
  "terabyte",
  "petabyte",
];

// Alternatively, though less succinct/descriptive
// const UNITS = ["", "kilo", "mega", "giga", "tera", "peta"].map(
//   (prefix) => `${prefix}byte`,
// );

// SI units, where 1 gigabyte = 1000 megabytes
export const formatBytes = (
  bytes: number,
  ...[locales, options]: ConstructorParameters<Intl.NumberFormatConstructor>
): string => {
  // Negative bytes doesn't really make sense
  if (Math.sign(bytes) === -1) return `-${formatBytes(Math.abs(bytes))}`;

  const exponent =
    // 0 becomes -Infinity, nonfinite numbers cannot index UNITS
    bytes !== 0 && Number.isFinite(bytes) ?
      Math.min(
        Math.floor(Math.log10(bytes) / 3),
        UNITS.length - 1, // set to max unit if exponent exceeds largest unit (i.e. petabyte)
      )
    : 0; // defaults to unit "byte"

  const value = bytes / 1000 ** exponent;

  // Initializes new NumberFormat instance every time, may want to use one
  // instance if using frequently for caching
  return new Intl.NumberFormat(locales, {
    style: "unit",
    unit: UNITS[exponent],
    ...options,
  }).format(value);
};

/**
 * Alternatively, using Binary rather than SI units, where 1 gigabyte = 1024
 * megabytes. Technically, should be using kibibytes, mebibytes, etc., but these
 * are not supported units in ECMA-402.
 */
export const formatBytesBinary = (
  bytes: number,
  ...[locales, options]: ConstructorParameters<Intl.NumberFormatConstructor>
): string => {
  if (Math.sign(bytes) === -1) return `-${formatBytesBinary(Math.abs(bytes))}`;

  const exponent =
    Number.isFinite(bytes) && bytes !== 0 ?
      Math.min(Math.floor(Math.log2(bytes) / 10), UNITS.length - 1)
    : 0;

  const value = bytes / 1024 ** exponent;

  return new Intl.NumberFormat(locales, {
    style: "unit",
    unit: UNITS[exponent],
    ...options,
  }).format(value);
};
```

### formatNumber.ts

```typescript
export const formatNumber = (
  number: unknown,
  ...params: ConstructorParameters<Intl.NumberFormatConstructor>
) => new Intl.NumberFormat(...params).format(Number(number));
```

### formatOrdinal.ts

```typescript
// Only true for English, becomes significantly more complex for other languages
const SUFFIXES = {
  zero: "th",
  one: "st",
  two: "nd",
  few: "rd",
  other: "th",
  many: "th", // should never occur in English, included for TypeScript
} satisfies Record<Intl.LDMLPluralRule, string>;

export const formatOrdinal = (
  num: number,
  ...[locales, options]: ConstructorParameters<Intl.PluralRulesConstructor>
) => {
  const suffix =
    SUFFIXES[
      new Intl.PluralRules(locales, {
        type: "ordinal",
        ...options,
      }).select(num)
    ];

  return `${num}${suffix}`;
};
```

### uri.ts

```typescript
/**
 * In the future, this may be simplified with the `String.cooked` proposal
 * {@link https://github.com/tc39/proposal-string-cooked}
 */
export const uri = (
  template: TemplateStringsArray,
  // valid values for encodeURIComponent
  ...values: (string | number | boolean)[]
) => String.raw({ raw: template }, ...values.map((v) => encodeURIComponent(v)));
```

## color

### color.ts

```typescript
/**
 * Some color utilities. Unfortunately, color manipulation in general is really
 * complicated, and a task more befitting of a library than a handful of utility
 * functions. If you need to do anything more complicated than what's here, see
 * the libraries: color, color-string, d3-color, colord, tinycolor2, chroma-js,
 * etc. Or, if you're using a CSS-in-JS library, it might have color utilities
 * built in.
 *
 * If you want to see a more complex set of color manipulation utils, see
 * {@link https://github.com/microsoft/vscode/blob/main/src/vs/base/common/color.ts}
 */

// no support for alpha channel/transparency
type RGB = {
  r: number;
  g: number;
  b: number;
};

export const hexToRgb = (hex: string): RGB => {
  const hexValue = hex.startsWith("#") ? hex.slice(1) : hex;
  const fullHex =
    hexValue.length === 3 || hexValue.length === 4 ?
      [...hexValue].map((char) => char.repeat(2)).join("")
    : hexValue;

  const bigint = parseInt(fullHex, 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

export const rgbToHex = ({ r, g, b }: RGB) =>
  `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
```

## array

### chunk.ts

```typescript
// immutable approach
export const chunk = <T>(items: T[], size: number) =>
  items.reduce<T[][]>((arr, item, i) => {
    return i % size === 0 ?
        [...arr, [item]]
      : [...arr.slice(0, -1), [...(arr.slice(-1)[0] || []), item]];
  }, []);

// mutable approach, slightly faster and cleaner code
export const chunk1 = <T>(items: T[], size: number) => {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
};
```

### isIterable.ts

```typescript
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
```

### minMax.ts

```typescript
// unlike [Math.min(), Math.max()], this function only iterates through the
// array once, more suitable for large arrays (and prevents stack overflow
// errors)
export const minMax = (arr: number[]) =>
  arr.reduce<[number, number]>(
    (acc, item) => {
      acc[0] = Math.min(acc[0], item);
      acc[1] = Math.max(acc[1], item);
      return acc;
    },
    // by default, the min is Infinity and the max is -Infinity to handle empty arrays
    // can remove this default if you know the array will never be empty
    [Infinity, -Infinity],
  );
```

### range.ts

```typescript
/**
 * Generate an array of numbers from start to end (inclusive) with optional step
 *
 * Roughly equivalent to `Iterable.range()` proposal, see
 * {@link https://github.com/tc39/proposal-iterator.range}
 *
 * @example range(1, 5) // [1, 2, 3, 4, 5]
 */
export const range = (start: number, end: number, step = 1) => {
  const length =
    Math.sign(step) === 1 ?
      Math.max(Math.ceil((end - start + 1) / step), 0)
      // If step is negative, go backwards.
      // Alternatively, may be removed and use .toReversed() when needed
    : Math.max(Math.ceil((start - end + 1) / Math.abs(step)), 0);

  /**
   * Performance-wise, new Array().map() is significantly faster than
   * Array.from(), but Array constructor is often discouraged due to weird
   * behavior
   *
   * @see https://google.github.io/styleguide/tsguide.html#array-constructor
   * @see https://jsbench.me/lxlv8rn8kd
   */

  return Array.from({ length }, (_, index) => start + index * step);
};
```
