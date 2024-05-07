import { assertNever } from "./assertNever";

describe("assertNever function", () => {
  describe("should throw an error", () => {
    it.each([
      ["object", {}],
      ["null", null],
      ["undefined", undefined],
      ["number", 0],
      ["string", "string"],
      ["boolean", true],
      ["symbol", Symbol.iterator],
    ])("should throw for %s", (_, value) => {
      expect(() => assertNever(value as never)).toThrow();
    });
  });
});
