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
