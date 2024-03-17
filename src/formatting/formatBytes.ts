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
  ...[locales, options]: ConstructorParameters<typeof Intl.NumberFormat>
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
