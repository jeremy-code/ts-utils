import { createRangeMapper } from "./createRangeMapper";

describe("createRangeMapper function", () => {
  describe("map letter grades", () => {
    const calculateLetterGrade = createRangeMapper({
      A: [90, 100],
      B: [80, 90],
      C: [70, 80],
      D: [60, 70],
      F: [0, 60],
    });

    describe("should return correct letter grade on lower limit", () => {
      it.each([
        [100, "A"],
        [90, "A"],
        [80, "B"],
        [70, "C"],
        [60, "D"],
        [50, "F"],
      ])("for %d, returns %s", (value: number, expected: string) => {
        expect(calculateLetterGrade(value)).toBe(expected);
      });
    });

    describe("should return correct letter grade on upper limit", () => {
      it.each([
        [99, "A"],
        [91, "A"],
        [81, "B"],
        [71, "C"],
        [61, "D"],
        [59, "F"],
      ])("for %d, returns %s", (value: number, expected: string) => {
        expect(calculateLetterGrade(value)).toBe(expected);
      });
    });

    describe("should return correct letter grade on middle values", () => {
      it.each([
        [95, "A"],
        [85, "B"],
        [75, "C"],
        [65, "D"],
        [55, "F"],
      ])("for %d, returns %s", (value: number, expected: string) => {
        expect(calculateLetterGrade(value)).toBe(expected);
      });
    });

    describe("should throw an error for invalid values", () => {
      it.each([
        [101, `"Invalid value with no corresponding range: 101"`],
        [-1, `"Invalid value with no corresponding range: -1"`],
      ])("for %d, throws an error", (value: number, error: string) => {
        expect(() =>
          calculateLetterGrade(value),
        ).toThrowErrorMatchingInlineSnapshot(error);
      });
    });
  });

  describe("map pass/fail grades", () => {
    const calculatePassFail = createRangeMapper({
      Pass: [70, 100],
      Fail: [0, 70],
    });

    describe("should return correct pass/fail grade on limits", () => {
      it.each([
        [100, "Pass"],
        [70, "Pass"],
        [69, "Fail"],
        [0, "Fail"],
      ])("for %d, returns %s", (value: number, expected: string) => {
        expect(calculatePassFail(value)).toBe(expected);
      });
    });

    describe("should return correct pass/fail grade on middle values", () => {
      it.each([
        [85, "Pass"],
        [60, "Fail"],
      ])("for %d, returns %s", (value: number, expected: string) => {
        expect(calculatePassFail(value)).toBe(expected);
      });
    });

    describe("should throw an error for invalid values", () => {
      it.each([
        [101, `"Invalid value with no corresponding range: 101"`],
        [-1, `"Invalid value with no corresponding range: -1"`],
      ])("for %d, throws an error", (value: number, error: string) => {
        expect(() =>
          calculatePassFail(value),
        ).toThrowErrorMatchingInlineSnapshot(error);
      });
    });
  });
});
