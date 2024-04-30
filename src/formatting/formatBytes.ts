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
    bytes !== 0 && Number.isFinite(bytes)
      ? Math.min(
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
    Number.isFinite(bytes) && bytes !== 0
      ? Math.min(Math.floor(Math.log2(bytes) / 10), UNITS.length - 1)
      : 0;

  const value = bytes / 1024 ** exponent;

  return new Intl.NumberFormat(locales, {
    style: "unit",
    unit: UNITS[exponent],
    ...options,
  }).format(value);
};
