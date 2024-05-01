const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * For flexibility and/or to flex, CHARACTERS can be generated programmatically
 *
 * @example
 * ```ts
 * const CHARACTERS = Array.from(
 *   { length: 62 }, // 26 + 26 + 10
 *   (_, i) =>
 *     i < 26
 *       ? String.fromCharCode(i + 65) // uppercase letters ('A' = 65)
 *       : i < 52 // 26 + 26
 *         ? String.fromCharCode(i + 71) // lowercase letters ('a' = 97)
 *         : String.fromCharCode(i - 4), // numbers ('0' = 48)
 * ).join("");
 * ```
 */

export const randomString = (length: number, characters = CHARACTERS) =>
  Array.from(
    // using crypto.getRandomValues() for better randomness/security
    crypto.getRandomValues(new Uint8Array(length)),
    (byte) => characters[byte % characters.length],
  ).join("");
