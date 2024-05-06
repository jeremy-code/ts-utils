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
