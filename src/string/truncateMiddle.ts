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
