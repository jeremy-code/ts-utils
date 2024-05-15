import { arrayEqual, nestedArrayEqual } from "./arrayEqual";

describe("arrayEqual", () => {
  describe("returns true when arrays are equal", () => {
    it.each([
      [
        [1, 2, 3],
        [1, 2, 3],
      ],
      [[], []],
      [
        ["a", "b", "c"],
        ["a", "b", "c"],
      ],
      [
        [true, false, true],
        [true, false, true],
      ],
      [
        /* eslint-disable no-sparse-arrays -- testing sparse arrays */
        [1, , , , , , , , , , , , , , , , , , , , , , , , 10],
        [1, , , , , , , , , , , , , , , , , , , , , , , , 10],
        /* eslint-enable no-sparse-arrays */
      ],
    ])(`returns true for %p and %p`, (value1, value2) => {
      expect(arrayEqual(value1, value2)).toBe(true);
    });
  });

  describe("returns false when arrays are not equal", () => {
    describe("returns false when arrays have same size and different values", () => {
      it.each([
        // same size, different values
        [
          [1, 2, 3],
          [1, 2, 4],
        ],
        [
          ["a", "b", "c"],
          ["a", "b", "d"],
        ],
        [
          [true, false, true],
          [true, false, false],
        ],
        [
          /* eslint-disable no-sparse-arrays -- testing sparse arrays */
          [1, , , , , , , , , , , , , , , , , , , , , , , , 10],
          [1, , , , , , , , , , , , , , , , , , , , , , , , 11],
          /* eslint-enable no-sparse-arrays */
        ],
      ])(`returns false for %p and %p`, (value1, value2) => {
        expect(arrayEqual(value1, value2)).toBe(false);
      });
    });

    describe("returns false when arrays have different size", () => {
      it.each([
        [
          [1, 2, 3],
          [1, 2],
        ],
        [
          ["a", "b", "c"],
          ["a", "b"],
        ],
        [
          [true, false, true],
          [true, false],
        ],
        [
          /* eslint-disable no-sparse-arrays -- testing sparse arrays */
          [1, , , , , , , , , , , , , , , , , , , , , , , , 10],
          [1, , , , , , , , , , , , , , , , , , , , 10],
          /* eslint-enable no-sparse-arrays */
        ],
      ])(`returns false for %p and %p`, (value1, value2) => {
        expect(arrayEqual(value1, value2)).toBe(false);
      });
    });
  });
});

describe("nestedArrayEqual", () => {
  describe("returns true when arrays are equal", () => {
    it.each([
      [
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
      ],
    ])(`returns true for %p and %p`, (value1, value2) => {
      expect(nestedArrayEqual(value1, value2)).toBe(true);
    });
  });

  describe("returns false when arrays are not equal", () => {
    it.each([
      [
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
        [
          [4, 5, 6],
          [7, 8, 9],
        ],
      ],
    ])(`returns true for %p and %p`, (value1, value2) => {
      expect(nestedArrayEqual(value1, value2)).toBe(false);
    });
  });
});
