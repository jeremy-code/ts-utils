# ts-utils

# Table of contents

- [Object](#object)
- [Array](#array)
- [Number](#number)
- [Function](#function)
- [String](#string)
- [Colors](#colors)
- [Formatting](#formatting)
- [TypeScript](#typescript)

# Object

```ts
// for plain objects, whose values are non-Objects
export const shallowCompare = <T extends Record<string, unknown>>(
  obj1: T,
  obj2: T
) => {
  if (Object.is(obj1, obj2)) return true;
  if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) return false;

  const entries1 = Object.entries(obj1);
  const entries2 = Object.entries(obj2);

  return (
    entries1.length === entries2.length &&
    !entries1.some(([key, value]) => obj2[key] !== value)
  );
};
```

```ts
/**
 * naive implementation, some caveats, see
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description}
 */
export const deepCompare = (obj1, obj2) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);
```

```ts
// converts formData to object where values are either singular value or array (e.g. checkboxes)
export const parseFormData = (formData: FormData) =>
  Array.from(formData.entries()).reduce((acc, [k, v]) => {
    if (!acc[k]) {
      const values = formData.getAll(k);
      acc[k] = values.length > 1 ? values : v;
    }
    return acc;
  }, {} as Record<string, FormDataEntryValue | FormDataEntryValue[]>);
```

```ts
export const parseUrlSearchParams = (searchParams: URLSearchParams) =>
  Array.from(searchParams).reduce((acc, [k, v]) => {
    if (!acc[k]) {
      const values = formData.getAll(k);
      acc[k] = values.length > 1 ? values : v;
    }
    return acc;
  }, {} as Record<string, string | string[]>);
```

# Array

```ts
// valid if array is not too large, technically slow since running loop on array twice
export const minMax = (arr: number) => [Math.min(...arr), Math.max(...arr)];

// reduce
export const minmax = (arr: number[]) =>
  data.reduce(
    (acc: number[], num) => {
      acc[0] = num < acc[0] ? num : acc[0];
      acc[1] = acc[1] === undefined || num > acc[1] ? num : acc[1];
      return acc;
    },
    [Infinity, -Infinity]
  );
```

```ts
export const range = (start: number, end: number, step = 1) =>
  Array.from(
    { length: Math.ceil((end - start + 1) / step) },
    (_, index) => start + index * step
  );
```

```ts
const chunk = <T>(input: T[], size: number) => {
  return input.reduce((arr, item, i) => {
    return i % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};
```

```ts
arr.flat(Infinity);

// recursive
const flattenDeep = <T>(arr: T[]) =>
  arr.flatMap((subArray, index) =>
    Array.isArray(subArray) ? flattenDeep(subArray) : subArray
  );
```

# Number

```ts
// inclusive of both min and max
//
function randomNum(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}
```

```js
// random int in range [min, max] inclusive
function randomInt(min: number, max: number) {
  // change to (Math.floor(max) - Math.ceil(min)) for max to be exclusive
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min)
  );
}
```

# Function

```ts
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | undefined;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const later = () => {
      timeout = undefined;
      if (!immediate) callback.apply(this, args);
    };

    const callNow = immediate && timeout === undefined;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) callback.apply(this, args);
  };
}
```

```ts
function throttle(func: () => void, timeFrame: number) {
  let lastTime = 0;
  return function (...args) {
    const now = new Date();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
}
```

# String

```ts
export const capitalize = ([first, ...rest]: string) => `${first.toUppercase()}${...rest}`

export const capitalize = (str: string) => str.charAt(0) + str.slice(1)

export const capitalize = (str: string) => `${str[0]}${str.substring(1)}`

```

```ts
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

```ts
export const normalize = (str: string) => str.normalize().trim().toWellFormed();
```

# Colors

```ts
type RGB = {
  r: number;
  g: number;
  b: number;
};

export const hexToRgb = (hex: string): RGB => {
  const bigint = parseInt(hex.slice(1), 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

export const rgbToHex = ({ r, g, b }: RGB) =>
  `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
```

# Formatting

```ts
export const formatNumber = (
  number: unknown,
  options?: Intl.NumberFormatOptions
  // alternatively, use `locale: string` to specify a locale
) => new Intl.NumberFormat(undefined, options).format(Number(number));
```

```ts
export const formatBytes = (
  bytes: number,
  options?: Intl.NumberFormatOptions
  // alternatively, use `locale: string` to specify a locale
  // locale?: string
) => {
  /**
   * Per {@link https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers},
   * these are the valid units for the "unit" style. Since each unit multiple is
   * considered a separate unit, we have to manually determine the appropriate unit
   * and corresponding value, otherwise we get formatting such as "1 BB" instead of
   * "1 GB".
   */
  const units = [
    "byte",
    "kilobyte",
    "megabyte",
    "gigabyte",
    "terabyte",
    "petabyte",
  ];
  if (!bytes || bytes <= 0) return `0 ${units[0]}s`;

  // note, this is in base 10 and not base 2, so gigabyte = 1000 megabytes
  const exponent = Math.min(
    Math.floor(Math.log10(bytes) / 3),
    units.length - 1
  );

  // for binary units, where 1 gigabyte = 1024 megabytes
  // const exponent = Math.min(Math.floor(Math.log2(bytes) / 10), units.length - 1);

  const value = bytes / 1000 ** exponent;

  // for binary units
  // const value = bytes / 1024 ** exponent;

  return new Intl.NumberFormat(undefined, {
    style: "unit",
    unit: units[exponent],
    ...options,
  }).format(value);
};
```

```ts
export const uri = (
  strings: TemplateStringsArray,
  // valid values for encodeURIComponent
  ...values: (string | number | boolean)[]
) => String.raw({ raw: strings }, ...values.map((v) => encodeURIComponent(v)));
```

```ts
const formatOrdinal = (
  num: unknown,
  options?: Intl.NumberFormatOptions
  // alternatively, use `locale: string` to specify a locale
  // locale?: string
  ) => {
  const rule = new Intl.PluralRules(undefined, { type: "ordinal", ...options }).select(Number(num));
  const suffix = {
    one: "st",
    two: "nd",
    few: "rd,
    other: "th
  }[rule];

  return `${num}${suffix}`;
};
```

# TypeScript

<details>
  <summary>HttpStatusCode Enum</summary>

```ts
enum HttpStatusCode {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLY_HINTS = 103,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207,
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  MOVED_TEMPORARILY = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  REQUEST_TOO_LONG = 413,
  REQUEST_URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  IM_A_TEAPOT = 418,
  INSUFFICIENT_SPACE_ON_RESOURCE = 419,
  METHOD_FAILURE = 420,
  MISDIRECTED_REQUEST = 421,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  FAILED_DEPENDENCY = 424,
  UPGRADE_REQUIRED = 426,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  INSUFFICIENT_STORAGE = 507,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}

// Usage
console.log(HttpStatusCode.OK); // 200
```

</details>

```ts
type Primitive = string | number | bigint | boolean | symbol | null | undefined;

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

// ideally, should be validated at runtime rather and just use number as type for compile-time
type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

// for nested objects
type Prettify<T> = {
  [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
} & unknown;
```
