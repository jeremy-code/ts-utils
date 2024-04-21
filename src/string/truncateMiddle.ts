// use text-overflow: ellipsis in CSS if truncating text in the middle is not necessary

export const truncateMiddle = (
  text: string,
  maxLength: number,
  // may want to set default placeholder to "…" (unicode ellipsis character)
  // instead of "..." (three dots)
  placeholder = "...",
) =>
  text.length > maxLength
    ? text.slice(0, Math.ceil((maxLength - placeholder.length) / 2)) +
      placeholder +
      text.slice(-Math.floor((maxLength - placeholder.length) / 2))
    : text;
