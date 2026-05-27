import { describe, expect, test } from "vitest";

import { isPlainObject } from "./isPlainObject";

describe("isPlainObject", () => {
  describe("returns true for plain objects", () => {
    test.each([[{}], [{ key: "value" }], [Object.create(null)]])(
      "returns true for plain object %p",
      (obj) => {
        expect(isPlainObject(obj)).toBe(true);
      },
    );
  });

  describe("returns false for primitives", () => {
    test.each([
      [null],
      [undefined],
      [1],
      [Number.NaN],
      ["string"],
      [true],
      [false],
    ])("returns false for primitive %p", (value) => {
      expect(isPlainObject(value)).toBe(false);
    });
  });

  describe("returns false for other objects", () => {
    class MyClass {}

    test.each([
      [[]],
      [[1, 2, 3]],
      [new MyClass()],
      [new Date()],
      [/regex/],
      [function () {}],
      [() => {}],
      [Symbol("sym")],
    ])("returns false for object type %p", (obj) => {
      expect(isPlainObject(obj)).toBe(false);
    });
  });
});
