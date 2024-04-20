const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const randomString = (length: number, characters = CHARACTERS) =>
  Array.from(
    // using crypto.getRandomValues for better randomness/security
    crypto.getRandomValues(new Uint8Array(length)),
    (byte) => characters[byte % characters.length],
  ).join("");
