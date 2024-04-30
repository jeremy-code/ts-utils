import { createRangeMapper } from "./createRangeMapper";

describe("createRangeMapper", () => {
  it("should return a range mapper", () => {
    const calculateLetterGrade = createRangeMapper({
      A: [90, 100],
      B: [80, 90],
      C: [70, 80],
      D: [60, 70],
      F: [0, 60],
    });

    expect(calculateLetterGrade(100)).toBe("A");
    expect(calculateLetterGrade(95)).toBe("A");
    expect(calculateLetterGrade(85)).toBe("B");
    expect(calculateLetterGrade(75)).toBe("C");
    expect(calculateLetterGrade(65)).toBe("D");
    expect(calculateLetterGrade(55)).toBe("F");

    expect(() => calculateLetterGrade(200)).toThrowErrorMatchingInlineSnapshot(
      `"Invalid value with no corresponding range: 200"`,
    );

    const calculatePassFail = createRangeMapper({
      P: [70, 100],
      F: [0, 70],
    });

    expect(calculatePassFail(100)).toBe("P");
    expect(calculatePassFail(95)).toBe("P");
    expect(calculatePassFail(65)).toBe("F");

    expect(() => calculatePassFail(200)).toThrowErrorMatchingInlineSnapshot(
      `"Invalid value with no corresponding range: 200"`,
    );
  });
});
