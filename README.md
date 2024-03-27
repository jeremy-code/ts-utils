# ts-utils [![GitHub Actions badge](https://github.com/jeremy-code/ts-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremy-code/ts-utils/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/jeremy-code/ts-utils)](LICENSE)

# Table of Contents

- array
  - [chunk.ts](#array/chunk.ts)
  - [minMax.ts](#array/minmax.ts)
  - [range.ts](#array/range.ts)
- color
  - [color.ts](#color/color.ts)
- formatting
  - [formatBytes.ts](#formatting/formatbytes.ts)
  - [formatNumber.ts](#formatting/formatnumber.ts)
  - [formatOrdinal.ts](#formatting/formatordinal.ts)
  - [uri.ts](#formatting/uri.ts)
- function
  - [debounce.ts](#function/debounce.ts)
  - [sleep.ts](#function/sleep.ts)
  - [throttle.ts](#function/throttle.ts)
- misc
  - [assertIsError.ts](#misc/assertiserror.ts)
  - [assertNever.ts](#misc/assertnever.ts)
  - [isBrowser.ts](#misc/isbrowser.ts)
- number
  - [randomNum.ts](#number/randomnum.ts)
- object
  - [isEmpty.ts](#object/isempty.ts)
  - [isPlainObject.ts](#object/isplainobject.ts)
  - [parseFormData.ts](#object/parseformdata.ts)
  - [parseUrlSearchParams.ts](#object/parseurlsearchparams.ts)
  - [shallowEqual.ts](#object/shallowequal.ts)
- string
  - [capitalize.ts](#string/capitalize.ts)
  - [randomString.ts](#string/randomstring.ts)
  - [truncateMiddle.ts](#string/truncatemiddle.ts)

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

// mutable approach, slightly faster
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
export const minmax = (arr: number[]) =>
  arr.reduce<[number, number]>(
    (acc, item) => {
      acc[0] = Math.min(acc[0], item);
      acc[1] = Math.max(acc[1], item);
      return acc;
    },
    [Infinity, -Infinity]
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
  if (!bytes || bytes <= 0) return `0 ${UNITS[0]}s`;

  // note, this is in base 10 and not base 2, so gigabyte = 1000 megabytes
  const exponent = Math.min(
    Math.floor(Math.log10(bytes) / 3),
    UNITS.length - 1
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
  [locales, options]: ConstructorParameters<Intl.PluralRulesConstructor>
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

## function

### debounce.ts

```typescript
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  ms?: number,
  immediate?: boolean
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
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
```

### throttle.ts

```typescript
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  ms: number,
  immediate?: boolean
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

## misc

### assertIsError.ts

```typescript
export function assertIsError(e: unknown): asserts e is Error {
  if (!(e instanceof Error)) {
    throw new Error(`Expected an Error but got ${e}`, { cause: e });
  }
}
```

### assertNever.ts

```typescript
export default function assertNever(value: never, message?: string): never {
  throw new Error(message ? message : `Unexpected value: ${value}`, {
    cause: value,
  });
}
```

### isBrowser.ts

```typescript
const isBrowser = typeof window === "object" && typeof document === "object";

const isNode =
  typeof process === "object" &&
  process.title === "node" &&
  process.release.name === "node";

const runtime =
  globalThis.process?.release?.name === "node" ? "node" : "browser";
```

## number

### randomNum.ts

```typescript
export const randomNum = (min: number, max: number) =>
  Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min)
  );
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
    proto = Object.getPrototypeOf(proto);
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
    {}
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
  obj2: T
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

## string

### capitalize.ts

```typescript
// preference for .charAt() over array indexing [] in case of empty string ""

export const capitalize = <T extends string>(str: T) =>
  `${str.charAt(0).toUpperCase()}${str.substring(1)}` as Capitalize<T>;

export const capitalize1 = ([first, ...rest]: string) =>
  `${first?.toUpperCase()}${rest.join("")}`;

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
    crypto.getRandomValues(new Uint8Array(length)),
    (byte) => characters[byte % characters.length]
  ).join("");
```

### truncateMiddle.ts

```typescript
// use text-overflow: ellipsis in CSS if truncating text in the middle is not necessary

export const truncateMiddle = (
  text: string,
  maxLength: number,
  placeholder = "..."
) =>
  text.length > maxLength
    ? text.slice(0, Math.ceil((maxLength - placeholder.length) / 2)) +
      placeholder +
      text.slice(-Math.floor((maxLength - placeholder.length) / 2))
    : text;
```
