import { isEmpty, isEmpty1 } from "./isEmpty";

describe.each([
  ["isEmpty", isEmpty],
  ["isEmpty1", isEmpty1],
])("%s", (_name, fn) => {
  describe("returns true for empty values", () => {
    it.each([
      [null, true],
      [undefined, true],
      [[], true],
      [{}, true],
      [new Map(), true],
      [new Set(), true],
      ["", true],
    ])("returns true for %p", (value, expected) => {
      expect(fn(value)).toBe(expected);
    });
  });

  describe("returns false for non-empty values", () => {
    it.each([
      [0, false],
      [1, false],
      [false, false],
      [true, false],
      ["string", false],
      [[1], false],
      [{ key: "value" }, false],
      [new Map([[1, 2]]), false],
      [new Set([1]), false],
    ])("returns false for %p", (value, expected) => {
      expect(fn(value)).toBe(expected);
    });
  });
});
