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
  - [pick.ts](#pickts)
  - [shallowEqual.ts](#shallowEqualts)
- [number](#number)
  - [randomNum.ts](#randomNumts)
  - [relativeError.ts](#relativeErrorts)
  - [statistics.ts](#statisticsts)
- [misc](#misc)
  - [assertIsError.ts](#assertIsErrorts)
  - [assertNever.ts](#assertNeverts)
  - [createRangeMapper.ts](#createRangeMapperts)
  - [store.ts](#storets)
- [function](#function)
  - [debounce.ts](#debouncets)
  - [sleep.ts](#sleepts)
  - [throttle.ts](#throttlets)
- [formatting](#formatting)
  - [formatBytes.ts](#formatBytests)
  - [formatMs.ts](#formatMsts)
  - [formatNumber.ts](#formatNumberts)
  - [formatOrdinal.ts](#formatOrdinalts)
  - [uri.ts](#urits)
- [color](#color)
  - [color.ts](#colorts)
- [array](#array)
  - [arrayEqual.ts](#arrayEqualts)
  - [chunk.ts](#chunkts)
  - [isIterable.ts](#isIterablets)
  - [minMax.ts](#minMaxts)
  - [range.ts](#rangets)

## string

### capitalize.ts

```typescript
/**
 * @file Utility functions for the intrinsic string manipulation types in
 * TypeScript (e.g. capitalize, uncapitalize, uppercase, lowercase). capitalize
 * and uncapitalize are more useful, but uppercase and lowercase are included
 * for completeness.
 *
 * Functions are locale-insensitive and works best in English, and becomes
 * signficantly more complex if one wants locale sensitivity.
 */

// Preference for .charAt() over array indexing [] in case of empty string ""

export const capitalize = <T extends string>(str: T) =>
  `${str.charAt(0).toUpperCase()}${str.substring(1)}` as Capitalize<T>;

export const capitalize1 = ([first, ...rest]: string) =>
  `${(first ?? "").toUpperCase()}${rest.join("")}`;

export const capitalize2 = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const uncapitalize = <T extends string>(str: T) =>
  `${str.charAt(0).toLowerCase()}${str.substring(1)}` as Uncapitalize<T>;

/**
 * uppercase() and lowercase() functions for completeness. Since they are really
 * simple, simply using .toUpperCase() and .toLowerCase() methods and casting
 * should be preferred instead.
 */

export const uppercase = <T extends string>(str: T) =>
  str.toUpperCase() as Uppercase<T>;

export const lowercase = <T extends string>(str: T) =>
  str.toLowerCase() as Lowercase<T>;
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
    // Using crypto.getRandomValues() for better randomness/security
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
 *
 * @remark Default option is to segment by grapheme (letter for alphabetical scripts)
 */
export const segment = (
  input: string,
  ...[locales, options]: ConstructorParameters<typeof Intl.Segmenter>
) =>
  Array.from(new Intl.Segmenter(locales, options).segment(input)).map(
    (s) => s.segment,
  );

/**
 * Segment a string into an array of words. Filters out non-word-like segments
 * (e.g. punctuation marks). More reliable than input.split(" ").
 */
export const segmentByWord = (
  input: string,
  // if not interested in locale-specific word segmentation, may be ommitted and
  // just set locale to undefined and do not provide options
  locales?: Intl.LocalesArgument,
  options?: Omit<Intl.SegmenterOptions, "granularity">, // exclude granularity, always "word"
) =>
  Array.from(
    new Intl.Segmenter(locales, {
      granularity: "word",
      ...options,
    }).segment(input),
  )
    // Alternatively can use .reduce() to do so in single iteration
    // e.g. arr.reduce((acc, s) => (s.isWordLike ? [...acc, s.segment] : acc), [])
    .filter((s) => s.isWordLike)
    .map((s) => s.segment);
```

### truncateMiddle.ts

```typescript
// Use text-overflow: ellipsis in CSS to truncate text at the end of a string.

/**
 * Truncate a string to at most `targetLength` in the middle, keeping the first and
 * last characters while inserting a placeholder in the middle.
 *
 * Useful for hrefs, filenames, etc. where the start and end of the string are
 * important.
 *
 * In the future, this may not be necessary depending on CSS support, see:
 * {@link https://github.com/w3c/csswg-drafts/issues/3937}
 *
 * @example truncateMiddle("1234567890", 5) // "1...0"
 */
export const truncateMiddle = (
  str: string,
  targetLength: number,
  // May want to set default placeholder to "…" (unicode ellipsis character)
  // instead of "..." (three dots)
  placeholder = "...",
) =>
  str.length > targetLength ?
    str.slice(0, Math.ceil((targetLength - placeholder.length) / 2)) +
    placeholder +
    str.slice(-Math.floor((targetLength - placeholder.length) / 2))
  : str; // if targetLength is less than or equal to str.length, string will be returned as-is
```

## object

### isEmpty.ts

```typescript
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
```

### isPlainObject.ts

````typescript
/**
 * Walks up the prototype chain to find the base prototype, then compares it to
 * the original prototype. If they are the same, it is a plain object.
 *
 * Equivalent to `lodash.isplainobject`, which is the 382th most popular package with
 * 15M weekly downloads
 *
 * The signficantly easier function would be the following, but for cross-realm
 * objects, where the identity of the Object prototype is different, it would
 * fail:
 *
 * @example
 * ```ts
 * const isPlainObj = (value: unknown) =>
 *   !!value && Object.getPrototypeOf(value) === Object.prototype;
 * ```
 */
export function isPlainObject(obj: unknown) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const proto = Object.getPrototypeOf(obj) as object | null;

  // Null prototype (e.g. `Object.create(null)`)
  if (proto === null) {
    return true;
  }

  // Walks up the prototype chain to find the base prototype
  let baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto) as object;
  }

  return proto === baseProto;
}
````

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
/**
 * Parses FormData object into a plain object.
 */
export const parseFormData = (formData: FormData) =>
  Array.from(formData).reduce<
    Record<string, FormDataEntryValue | FormDataEntryValue[]>
  >((acc, [k, v]) => {
    if (!acc[k]) {
      // Returns array only if there are multiple values
      const values = formData.getAll(k);
      acc[k] = values.length > 1 ? values : v;
    }
    return acc;
  }, {});
```

### parseUrlSearchParams.ts

```typescript
/**
 * Parse URLSearchParams to plain object.
 */
export const parseUrlSearchParams = (urlSearchParams: URLSearchParams) =>
  Array.from(urlSearchParams).reduce<Record<string, string | string[]>>(
    (acc, [k, v]) => {
      if (!acc[k]) {
        // Returns array only if there are multiple values
        const values = urlSearchParams.getAll(k);
        acc[k] = values.length > 1 ? values : v;
      }
      return acc;
    },
    {},
  );
```

### pick.ts

```typescript
/**
 * @file pick() and omit() utility functions for objects, equivalent to the
 * TypeScript utility types `Pick` and `Omit`.
 */

// Equivalent to pick utility type in TypeScript and lodash.pick
export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Pick<T, K> =>
  // Casting to Pick<T, K> is necessary because Object.fromEntries returns { [k:
  // string]: T; }, so as long as keys are only strings, cast should be safe
  Object.fromEntries(keys.map((key) => [key, obj[key]])) as Pick<T, K>;

/**
 * Omit is not as common as pick, but here for completeness.
 *
 * Mutable approach, which imo is more readable. May want to change type from {
 * [key: string]: unknown } to something else (such as key: PropertyKey)
 * depending on use case.
 */

export function omit<T extends { [key: string]: unknown }, K extends keyof T>(
  object: T,
  keys: K[],
): Omit<T, K> {
  const omitted: { [key: string]: unknown } = {};
  Object.keys(object).forEach((key) => {
    if (!keys.includes(key as K)) {
      omitted[key] = object[key];
    }
  });
  return omitted as Omit<T, K>;
}

// Immutable approach by chaining Object.entries and Object.fromEntries
export const omit1 = <T extends { [key: string]: unknown }, K extends keyof T>(
  object: T,
  keys: K[],
): Omit<T, K> =>
  Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
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
/**
 * Generates a random integer between min and max (inclusive) using Math.random.
 *
 * Some may use Math.round (e.g. `Math.round(Math.random() * (max - min) +
 * min)`) but this skews the distribution.
 *
 * @example randomNum(1,6) // 4
 */
export const randomNum = (min: number, max: number) =>
  Math.floor(
    Math.random() *
      // Remove `+ 1` to make the max exclusive
      (Math.floor(max) - Math.ceil(min) + 1) +
      Math.ceil(min),
  );
```

### relativeError.ts

```typescript
export const relativeError = (actual: number, expected: number) =>
  // if expected is 0, returns NaN
  Math.abs((actual - expected) / expected);

// For completeness. Inlining the function `Math.abs(actual - expected)` is
// probably clearer
export const absoluteError = (actual: number, expected: number) =>
  Math.abs(actual - expected);
```

### statistics.ts

```typescript
/**
 * @file The basic statistics functions for numbers, expanding on what the Math
 * object provides. Realistically, you shouldn't need ALL of these functions,
 * but they are included for completeness. You likely want to use d3-array or
 * similar library for more complicated statistics.
 */

// min = Math.min
// max = Math.max
// range = Math.max - Math.min

/**
 * For now, sum is inlined when needed (e.g. .reduce((a, b) => a + b, 0)). This
 * is somewhat imprecise for groups of floating point numbers, but generally
 * fine for most use cases.
 *
 * In the future, Math.sumPrecise(), which is in Stage 2.7, may be avaliable and
 * may be used with some performance tradeoffs.
 *
 * {@link https://github.com/tc39/proposal-math-sum}
 */

export const mean = (...values: number[]) =>
  values.length === 0 ?
    undefined // Matches standard for array functions
  : values.reduce((acc, value) => acc + value, 0) / values.length;

export const median = (...values: number[]) => {
  if (values.length === 0) return undefined;

  // .sorted is standard ES2023, using .sort() which mutates array is also fine
  const sorted = values.toSorted((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 !== 0 ?
      sorted[mid]
      // Should never be undefined, `?? 0` for noUncheckedIndexedAccess
    : ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2;
};

export const mode = (...values: number[]) => {
  if (values.length === 0) return undefined;

  const counts = values.reduce(
    (acc, v) => acc.set(v, (acc.get(v) || 0) + 1),
    new Map<number, number>(),
  );
  const maxCount = Math.max(...counts.values());

  return Array.from(counts).reduce<number[]>(
    (acc, [value, count]) => (count === maxCount ? [...acc, value] : acc),
    [],
  );
  // Alternatively, chain .filter().map() instead of reduce() for readability
  // .filter(([, count]) => count === maxCount).map(([value]) => value);

  // May use .find() if only need first element with the highest count
};

export const variance = (...values: number[]) => {
  if (values.length === 0) return undefined;

  const mean = values.reduce((acc, value) => acc + value, 0) / values.length;
  return (
    values.reduce((acc, value) => acc + (value - mean) ** 2, 0) / values.length
  );
};

// Could use `variance()` for this calculation to simplify code
export const standardDeviation = (...values: number[]) => {
  if (values.length === 0) return undefined;

  const mean = values.reduce((acc, value) => acc + value, 0) / values.length;
  const variance =
    values.reduce((acc, value) => acc + (value - mean) ** 2, 0) / values.length;

  return Math.sqrt(variance);
};
```

## misc

### assertIsError.ts

```typescript
/**
 * Useful in try/catch blocks to ensure `error: unknown` is an Error without
 * having to wrap error handling in `if (error instanceof Error)`
 */
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
/**
 * Enforces that a value is never reached (e.g. in a switch statement). Useful
 * for exhaustiveness.
 */
export function assertNever(value: never, message?: string): never {
  // JSON.stringify is not perfect, such as for Map, Set, but works for most
  // cases, and avoids issues working with `never`
  throw new Error(message ?? `Unexpected value: ${JSON.stringify(value)}`, {
    cause: value,
  });
}
```

### createRangeMapper.ts

```typescript
type Range = [start: number, end: number];

export const createRangeMapper = <T extends PropertyKey>(
  map: Record<T, Range>,
) => {
  return (value: number) => {
    const entry = Object.entries<Range>(map).find(
      ([, [start, end]], i) =>
        i === 0 ?
          // Inclusive of start and end on first entry (e.g. on A: [90, 100], 100 would be an A)
          value >= start && value <= end
        : start <= value && value < end, // exclusive of end on subsequent entries
    );

    if (!entry) {
      throw new RangeError(
        `Invalid value with no corresponding range: ${value}`,
        {
          cause: { map, value },
        },
      );
    }

    return entry[0] as T;
  };
};
```

### store.ts

```typescript
/**
 * Intended for use in React with `useSyncExternalStore()`. For more complex use
 * cases, see a library like Zustand.
 *
 * A start for a simple store implementation. Notably, it wouldn't actually work
 * by itself. Since the state is mutated instead of replaced, React would never
 * re-render, since it passes Object.is equality due to having same reference.
 */
export function createStore<S>(initialState: S | (() => S)) {
  // Matches useState's behavior
  let state =
    typeof initialState === "function" ?
      (initialState as () => S)()
    : initialState;
  const listeners = new Set<() => void>();

  // Using an object with methods. Class may be more appropriate.
  return {
    getSnapshot: () => state,
    subscribe: (onStoreChange: () => void) => {
      listeners.add(onStoreChange);

      return () => listeners.delete(onStoreChange);
    },
    update: (newState: Partial<S>) => {
      state = { ...state, ...newState };
      listeners.forEach((listener) => listener());
    },
  };
}

// Would have to be initialized somewhere to be used:
export const store = createStore({ count: 0 });
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
/**
 * Throttle a function to be called at most once every `ms` milliseconds.
 */
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
 * formatting such as "1 BB" instead of "1 GB".
 *
 * Roughly equivalent to `pretty-bytes` package (ranked 916 in npm popularity,
 * 11M weekly downloads)
 */

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
  // Negative bytes doesn't really make sense. Not technically correct for
  // Intl.NumberFormat since doesn't obey signDisplay option, but as previously
  // stated, negative bytes doesn't make sense.
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

### formatMs.ts

```typescript
/**
 * @file Format milliseconds into human-readable strings. Similar to packages
 * `ms`, `pretty-ms`, `@lukeed/ms`, etc, albeit without parsing capabilities
 * (such would make the locale handling more complex and also likely involve
 * complex regex).
 *
 * Using `Intl.NumberFormat`, though `Intl.RelativeTimeFormat` may be more
 * appropriate depending on use case.
 */

// Constants for time conversion. Separated into individual constants, so they
// can be used with each other (rather than having to do 1000 * 60 * 60 * 24)
// and to do conversions in other files (e.g. const days = ms / MS_PER_DAY)

export const MS_PER_SECOND = 1000; // 1000ms = 1s
export const MS_PER_MINUTE = 60 * MS_PER_SECOND; // 60s = 1min
export const MS_PER_HOUR = 60 * MS_PER_MINUTE; // 60min = 1hr
export const MS_PER_DAY = 24 * MS_PER_HOUR; // 24hr = 1 day

/**
 * Per {@link https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers},
 * these are the valid byte units supported by the `Intl.NumberFormat` API.
 */
const UNITS: Record<string, number> = {
  // Units smaller than ms (e.g. microsecond, nanosecond) may be added here, but
  // since the standard libraries don't tend to support them, they are omitted
  // for consistency.
  second: MS_PER_SECOND,
  minute: MS_PER_MINUTE,
  hour: MS_PER_HOUR,
  day: MS_PER_DAY,
  // Likewise, week, month, etc. could also be added here. Note that due to
  // calendars, months/years are not fixed units.
};

export const formatMs = (
  ms: number,
  ...[locales, options]: ConstructorParameters<Intl.NumberFormatConstructor>
): string => {
  const unit = Object.entries(UNITS).reduce(
    // Find smallest unit that fits given ms
    (acc, [unit, msPerUnit]) => (ms / msPerUnit >= 1 ? unit : acc),
    "millisecond", // Defaults to ms if unit not found
  );

  return Intl.NumberFormat(locales, {
    style: "unit",
    unit,
    // For similar output to `ms` package, use options:
    // notation: "compact",
    // unitDisplay: "narrow",
    ...options,
  }).format(ms / (UNITS[unit] ?? 1));
};

/**
 * Exact time formatting where ms are rounded to the nearest unit
 *
 * Similar to `pretty-ms` package
 *
 * In the future, using `Intl.DurationFormat` (which is in Stage 3) may be more
 * appropriate, but it is currently only supported in Safari.
 */

export const formatMsExact = (
  ms: number,
  ...[locales, options]: Parameters<number["toLocaleString"]>
): string =>
  // Effectively, in English, join formatted units with space. Since there are
  // only 3 options for Intl.ListFormat, it seems unnecessary to have its own
  // option parameter
  new Intl.ListFormat(locales, {
    type: "unit",
    style: "narrow", // Update to "short" to add list separators (commas in English)
  }).format(
    // Did not include UNITS["millisecond"] since it seems redundant, but can be
    // added to constant UNITS if needed
    [["millisecond", 1] as const, ...Object.entries(UNITS)].reduceRight<
      string[]
    >((acc, [unit, msPerUnit]) => {
      if (ms >= msPerUnit) {
        const unitsPerMs = Math.floor(ms / msPerUnit);
        ms %= msPerUnit; // remainder, update ms
        // Using concat to avoid mutating array, but push is also valid
        acc = acc.concat([
          unitsPerMs.toLocaleString(locales, {
            style: "unit",
            unit,
            // For similar output to `pretty-ms` package, use these options:
            // notation: "compact", unitDisplay: "narrow",
            ...options,
          }),
        ]);
      }
      return acc;
    }, []),
  );
```

### formatNumber.ts

```typescript
/**
 * Coerces a value to a number and formats it using the provided options.
 */
export const formatNumber = (
  value: unknown,
  ...params: ConstructorParameters<Intl.NumberFormatConstructor>
) => new Intl.NumberFormat(...params).format(Number(value));
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
  many: "th", // Should never occur in English, included for TypeScript
} satisfies Record<Intl.LDMLPluralRule, string>;

/**
 * Formats a number as an ordinal (e.g. 1st, 2nd, 3rd, 4th).
 *
 * @example formatOrdinal(1) // "1st"
 */
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

  // Options are not passed to `toLocaleString` and using the shared parameters
  // of Intl.PluralRules. Feel free to add as an parameter if needed.
  return `${num.toLocaleString(locales, options)}${suffix}`;
};
```

### uri.ts

```typescript
/**
 * A tagged template literal for encoding URI components.
 *
 * In the future, this may be simplified with the `String.cooked` proposal
 * {@link https://github.com/tc39/proposal-string-cooked}
 *
 * @example uri`https://example.com/${name}` // https://example.com/John%20Doe
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
 * functions.
 *
 * If you need to do anything more complicated than what's here, see the
 * libraries: color, color-string, d3-color, colord, tinycolor2, chroma-js, etc.
 * Or, if you're using a CSS-in-JS library, it might have color utilities built
 * in.
 *
 * If you want to see a more complex set of color manipulation utils, see
 * {@link https://github.com/microsoft/vscode/blob/main/src/vs/base/common/color.ts}
 */

// No support for alpha channel/transparency
type RGB = {
  r: number;
  g: number;
  b: number;
};

export const hexToRgb = (hex: string): RGB => {
  const hexValue = hex.startsWith("#") ? hex.slice(1) : hex;
  // Expand shorthand hex values (e.g. #fff -> #ffffff)
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

### arrayEqual.ts

```typescript
export const arrayEqual = (value1: unknown[], value2: unknown[]) =>
  value1.length === value2.length &&
  value1.every((val, index) => Object.is(val, value2[index]));

export const nestedArrayEqual = <T>(value1: T[], value2: T[]): boolean => {
  if (value1.length !== value2.length) {
    return false;
  }

  return value1.every((val, index) => {
    // for TypeScript inference
    const value2Entry = value2[index];

    return Array.isArray(val) && Array.isArray(value2Entry) ?
        nestedArrayEqual(val, value2Entry)
      : Object.is(val, value2Entry);
  });
};
```

### chunk.ts

```typescript
// Immutable approach
export const chunk = <T>(items: T[], size: number) =>
  items.reduce<T[][]>((arr, item, i) => {
    return i % size === 0 ?
        [...arr, [item]]
      : [...arr.slice(0, -1), [...(arr.slice(-1)[0] || []), item]];
  }, []);

// Mutable approach, slightly faster and arguably cleaner code
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
```

### minMax.ts

```typescript
// Explicit type to name tuple elements
type Range = [min: number, max: number];

/**
 * Find the minimum and maximum values in an array of numbers.
 *
 * Unlike [Math.min(), Math.max()], this function only iterates through the
 * array once, more suitable for large arrays (and prevents stack overflow
 * errors, since Math.min/max is variadic).
 *
 * @example minMax([1, 2, 3, 4, 5]) // [1, 5]
 */
export const minMax = (arr: number[]) =>
  arr.reduce<Range>(
    (acc, item) => {
      acc[0] = Math.min(acc[0], item);
      acc[1] = Math.max(acc[1], item);
      return acc;
    },
    // By default, [min, max] = [Infinity, -Infinity] to handle empty arrays
    [Infinity, -Infinity],
  );
```

### range.ts

```typescript
/**
 * Generate an array of numbers from start to end (inclusive) with optional step
 *
 * Roughly equivalent to `Iterable.range()` proposal in Stage 2, see
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
