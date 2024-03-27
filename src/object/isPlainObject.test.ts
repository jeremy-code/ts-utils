import { isPlainObject } from "./isPlainObject";

describe("isPlainObject", () => {
  // Test with plain objects
  test("returns true for plain objects", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ key: "value" })).toBe(true);
  });

  // Test with instances of custom classes
  class MyClass {}
  test("returns false for instances of custom classes", () => {
    expect(isPlainObject(new MyClass())).toBe(false);
  });

  // Test with arrays
  test("returns false for arrays", () => {
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject([1, 2, 3])).toBe(false);
  });

  // Test with primitives
  test("returns false for null", () => {
    expect(isPlainObject(null)).toBe(false);
  });

  test("returns false for undefined", () => {
    expect(isPlainObject(undefined)).toBe(false);
  });

  test("returns false for numbers", () => {
    expect(isPlainObject(1)).toBe(false);
    expect(isPlainObject(Number.NaN)).toBe(false);
  });

  test("returns false for strings", () => {
    expect(isPlainObject("string")).toBe(false);
  });

  test("returns false for booleans", () => {
    expect(isPlainObject(true)).toBe(false);
    expect(isPlainObject(false)).toBe(false);
  });

  // Test with other object types
  test("returns false for dates", () => {
    expect(isPlainObject(new Date())).toBe(false);
  });

  test("returns false for regular expressions", () => {
    expect(isPlainObject(/regex/)).toBe(false);
  });

  test("returns false for functions", () => {
    expect(isPlainObject(function () {})).toBe(false);
    expect(isPlainObject(() => {})).toBe(false);
  });

  // Test with symbols
  test("returns false for symbols", () => {
    expect(isPlainObject(Symbol("sym"))).toBe(false);
  });

  // Test with null prototype
  test("returns true for objects with null prototype", () => {
    expect(isPlainObject(Object.create(null))).toBe(true);
  });
});
