import { shallowEqual } from "./shallowEqual"; // Adjust the import path as needed

describe("shallowCompare", () => {
  it("returns true for two identical objects", () => {
    const obj1 = { a: 1, b: "test" };
    const obj2 = { a: 1, b: "test" };
    expect(shallowEqual(obj1, obj2)).toBe(true);
  });

  it("returns false for two different objects", () => {
    const obj1 = { a: 1, b: "test" };
    const obj2 = { a: 2, b: "test" };
    expect(shallowEqual(obj1, obj2)).toBe(false);
  });

  it("returns true when comparing an object to itself", () => {
    const obj1 = { a: 1, b: "test" };
    expect(shallowEqual(obj1, obj1)).toBe(true);
  });

  it("returns false for objects with different lengths", () => {
    const obj1 = { a: 1, b: "test", c: true };
    const obj2 = { a: 1, b: "test" };
    expect(shallowEqual(obj1, obj2)).toBe(false);
  });

  it("returns false when comparing objects with different types", () => {
    const obj1 = { a: 1, b: "test" };
    const obj2 = { a: "1", b: "test" }; // Note: '1' is a string here
    // @ts-expect-error: next line is intentionally incorrect to test runtime behavior
    expect(shallowEqual(obj1, obj2)).toBe(false);
  });

  it("returns false when comparing an object with null", () => {
    const obj1 = { a: 1, b: "test" };
    const obj2 = null;
    // @ts-expect-error: next line is intentionally incorrect to test runtime behavior
    expect(shallowEqual(obj1, obj2)).toBe(false);
  });

  it("returns false when comparing an object with undefined", () => {
    const obj1 = { a: 1, b: "test" };
    const obj2 = undefined;
    // @ts-expect-error: next line is intentionally incorrect to test runtime behavior
    expect(shallowEqual(obj1, obj2)).toBe(false);
  });
});
