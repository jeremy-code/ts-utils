import { randomString } from "./randomString";

describe("randomString function", () => {
  const CHARACTERS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  test("should generate a string of the correct length", () => {
    const length = 10;
    const str = randomString(length);
    expect(str).toHaveLength(length);
  });

  test("should generate a string with valid characters only", () => {
    const length = 10;
    const str = randomString(length);
    expect([...str].every((char) => CHARACTERS.includes(char))).toBe(true);
  });

  test("should work with custom character sets", () => {
    const customCharacters = "ABC";
    const length = 5;
    const str = randomString(length, customCharacters);
    expect([...str].every((char) => customCharacters.includes(char))).toBe(
      true,
    );
    expect(str).toHaveLength(length);
  });

  // Edge case: Length is 0
  test("should return an empty string if the specified length is 0", () => {
    const str = randomString(0);
    expect(str).toBe("");
  });

  // Edge case: Custom characters string is empty
  test("should handle empty custom character sets gracefully", () => {
    const length = 5;
    const str = randomString(length, "");
    expect(str).toBe("");
  });
});
