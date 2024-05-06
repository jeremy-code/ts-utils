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
