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
  - [parseFormData.ts](#parseFormDatats)
  - [parseUrlSearchParams.ts](#parseUrlSearchParamsts)
  - [shallowEqual.ts](#shallowEqualts)
- [number](#number)
  - [randomNum.ts](#randomNumts)
- [misc](#misc)
  - [assertIsError.ts](#assertIsErrorts)
  - [assertNever.ts](#assertNeverts)
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
  - [minMax.ts](#minMaxts)
  - [range.ts](#rangets)

## string

### capitalize.ts

```typescript
// preference for .charAt() over array indexing [] in case of empty string ""

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

```typescript
const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const randomString = (length: number, characters = CHARACTERS) =>
  Array.from(
    // using crypto.getRandomValues for better randomness/security
    crypto.getRandomValues(new Uint8Array(length)),
    (byte) => characters[byte % characters.length],
  ).join("");
```

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
    .filter((s) => s.isWordLike)
    .map((s) => s.segment);

// alternatively can use .reduce() to do so in single iteration
// e.g. arr.reduce((acc, s) => (s.isWordLike ? [...acc, s.segment] : acc), [])
```

### truncateMiddle.ts

```typescript
// use text-overflow: ellipsis in CSS if truncating text in the middle is not necessary

export const truncateMiddle = (
  text: string,
  maxLength: number,
  placeholder = "...",
) =>
  text.length > maxLength
    ? text.slice(0, Math.ceil((maxLength - placeholder.length) / 2)) +
      placeholder +
      text.slice(-Math.floor((maxLength - placeholder.length) / 2))
    : text;
```

## object

### isEmpty.ts

```typescript
export const isEmpty = (value: unknown) => {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (typeof value === "object") return Object.entries(value).length === 0;

  return false;
};
```

### isPlainObject.ts

```typescript
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

## misc

### assertIsError.ts

```typescript
export function assertIsError(e: unknown): asserts e is Error {
  if (!(e instanceof Error)) {
    throw new Error(
      `Expected an Error but got ${e?.toString() ?? "unknown object without toString method"}`,
      {
        cause: e,
      },
    );
  }
}
```

### assertNever.ts

```typescript
export default function assertNever(value: never, message?: string): never {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(message ? message : `Unexpected value: ${value}`, {
    cause: value,
  });
}
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

/**
 * Since each unit multiple is considered a separate unit, we have to manually
 * determine the appropriate unit and corresponding value, otherwise we get
 * formatting such as "1 BB" instead of "1 GB".
 */
export const formatBytes = (
  bytes: number,
  ...[locales, options]: ConstructorParameters<Intl.NumberFormatConstructor>
) => {
  // negative bytes really doesn't make sense
  if (!bytes || bytes <= 0) return `0 ${UNITS[0]}s`;

  // note, this is in base 10 and not base 2, so gigabyte = 1000 megabytes
  const exponent = Math.min(
    Math.floor(Math.log10(bytes) / 3),
    UNITS.length - 1,
  );

  // for binary units, where 1 gigabyte = 1024 megabytes
  // const exponent = Math.min(Math.floor(Math.log2(bytes) / 10), units.length - 1);

  const value = bytes / 1000 ** exponent;

  // for binary units
  // const value = bytes / 1024 ** exponent;

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
// only true for English, becomes significantly more complex for other languages
const SUFFIXES = {
  zero: "th",
  one: "st",
  two: "nd",
  few: "rd",
  other: "th",
  many: "th",
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
export const uri = (
  template: TemplateStringsArray,
  // valid values for encodeURIComponent
  ...values: (string | number | boolean)[]
) => String.raw({ raw: template }, ...values.map((v) => encodeURIComponent(v)));
```

## color

### color.ts

```typescript
// no support for alpha channel/transparency
type RGB = {
  r: number;
  g: number;
  b: number;
};

export const hexToRgb = (hex: string): RGB => {
  const hexValue = hex.startsWith("#") ? hex.slice(1) : hex;
  const fullHex =
    hexValue.length === 3 || hexValue.length === 4
      ? [...hexValue].map((char) => char.repeat(2)).join("")
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
    return i % size === 0
      ? [...arr, [item]]
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

### minMax.ts

```typescript
// unlike [Math.min(), Math.max()], this function only iterates through the array once, more suitable for large arrays (and prevents stack overflow errors)
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
export const range = (start: number, end: number, step = 1) => {
  const length =
    Math.sign(step) === 1
      ? Math.max(Math.ceil((end - start + 1) / step), 0)
      : // step can be negative, go backwards
        Math.max(Math.ceil((start - end + 1) / Math.abs(step)), 0);

  return Array.from({ length }, (_, index) => start + index * step);
};
```
