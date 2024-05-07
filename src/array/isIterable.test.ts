import { isArrayLike, isIterable } from "./isIterable";

describe("isIterable function", () => {
  describe("returns true for iterable objects", () => {
    it.each([
      ["Array", []],
      ["Set", new Set()],
      ["Map", new Map()],
      ["String object wrapper", new String("string")],
      ["Uint8Array", new Uint8Array()],
    ])("returns true for %s", (_, value) => {
      expect(isIterable(value)).toBe(true);
    });
  });

  describe("returns false for non-iterable objects", () => {
    it.each([
      ["plain object", {}],
      ["null", null],
      ["undefined", undefined],
      ["number", 0],
      ["string primitive", "string"],
      ["boolean", true],
      ["symbol", Symbol.iterator],
    ])("returns false for %s", (_, value) => {
      expect(isIterable(value)).toBe(false);
    });
  });
});

describe("isArrayLike", () => {
  describe("returns true for array-like objects", () => {
    test.each([
      ["Array", []],
      ["object with only length", { length: 0 }],
      ["object with length and index properties", { length: 1, 0: "foo" }],
    ])("returns true for %s", (_, value) => {
      expect(isArrayLike(value)).toBe(true);
    });
  });

  describe("returns false for non-array-like objects", () => {
    test.each([
      ["plain object", {}],
      ["null", null],
      ["undefined", undefined],
      ["number", 0],
      ["boolean", true],
      ["symbol", Symbol.iterator],
    ])("returns false for %s", (_, value) => {
      expect(isArrayLike(value)).toBe(false);
    });
  });
});
