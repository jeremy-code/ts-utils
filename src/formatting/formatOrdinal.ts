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
