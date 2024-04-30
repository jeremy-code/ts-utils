import { isIterable, isArrayLike } from "./isIterable";

describe("isIterable", () => {
  it("should return true for default iterable objects", () => {
    expect(isIterable([])).toBe(true);
    expect(isIterable(new Set())).toBe(true);
    expect(isIterable(new Map())).toBe(true);
    expect(isIterable(new String("string"))).toBe(true); // using String object wrapper, not primitive
    expect(isIterable(new Uint8Array())).toBe(true);
  });

  it("should return false for non-iterable objects", () => {
    expect(isIterable({})).toBe(false);
    expect(isIterable(null)).toBe(false);
    expect(isIterable(undefined)).toBe(false);
    expect(isIterable(0)).toBe(false);
    expect(isIterable("string")).toBe(false); // primitive, not object. arguable if it should return true
    expect(isIterable(true)).toBe(false);
    expect(isIterable(Symbol.iterator)).toBe(false);
  });
});

describe("isArrayLike", () => {
  it("should return true for array-like objects", () => {
    expect(isArrayLike([])).toBe(true);
    expect(
      isArrayLike({
        length: 0,
      }),
    ).toBe(true);
    expect(
      isArrayLike({
        length: 0,
        0: "foo",
      }),
    ).toBe(true);
  });

  it("should return false for non-array-like objects", () => {
    expect(isArrayLike({})).toBe(false);
    expect(isArrayLike(null)).toBe(false);
    expect(isArrayLike(undefined)).toBe(false);
    expect(isArrayLike(0)).toBe(false);
    expect(isArrayLike(true)).toBe(false);
    expect(isArrayLike(Symbol.iterator)).toBe(false);
  });
});
