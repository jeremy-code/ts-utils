import { isPlainObject } from "./isPlainObject";

describe("isPlainObject", () => {
  describe("returns true for plain objects", () => {
    it.each([[{}], [{ key: "value" }], [Object.create(null)]])(
      "returns true for plain object %p",
      (obj) => {
        expect(isPlainObject(obj)).toBe(true);
      },
    );
  });

  describe("returns false for primitives", () => {
    it.each([
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

    it.each([
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
