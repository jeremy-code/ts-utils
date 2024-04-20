import { isEmpty } from "./isEmpty";

describe("isEmpty", () => {
  test("should return true for null", () => {
    expect(isEmpty(null)).toBe(true);
  });

  test("should return true for undefined", () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  test("should return true for an empty array", () => {
    expect(isEmpty([])).toBe(true);
  });

  test("should return false for a non-empty array", () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  test("should return true for an empty object", () => {
    expect(isEmpty({})).toBe(true);
  });

  test("should return false for a non-empty object", () => {
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  test("should return true for an empty map", () => {
    expect(isEmpty(new Map())).toBe(true);
  });

  test("should return false for a non-empty map", () => {
    expect(isEmpty(new Map([["a", 1]]))).toBe(false);
  });

  test("should return true for an empty set", () => {
    expect(isEmpty(new Set())).toBe(true);
  });

  test("should return false for a non-empty set", () => {
    expect(isEmpty(new Set([1, 2, 3]))).toBe(false);
  });

  test("should return true for an empty string", () => {
    expect(isEmpty("")).toBe(true);
  });

  test("should return false for non-null/undefined primitives (e.g., number, string, boolean)", () => {
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(false)).toBe(false);
  });
});
