import { formatOrdinal } from "./formatOrdinal";

describe("formatOrdinal function", () => {
  test("should correctly append ordinal suffixes to numbers", () => {
    expect(formatOrdinal(1, "en")).toBe("1st");
    expect(formatOrdinal(2, "en")).toBe("2nd");
    expect(formatOrdinal(3, "en")).toBe("3rd");
    expect(formatOrdinal(4, "en")).toBe("4th");
    expect(formatOrdinal(11, "en")).toBe("11th");
    expect(formatOrdinal(21, "en")).toBe("21st");
    expect(formatOrdinal(22, "en")).toBe("22nd");
    expect(formatOrdinal(23, "en")).toBe("23rd");
    expect(formatOrdinal(24, "en")).toBe("24th");
    expect(formatOrdinal(101, "en")).toBe("101st");
    expect(formatOrdinal(111, "en")).toBe("111th");
    expect(formatOrdinal(121, "en")).toBe("121st");
    expect(formatOrdinal(1_234_567_890, "en")).toBe("1234567890th"); // no locale string formatting
  });

  test("should handle edge cases", () => {
    expect(formatOrdinal(0, "en")).toBe("0th");
    expect(formatOrdinal(-1, "en")).toBe("-1st");
    expect(formatOrdinal(-2, "en")).toBe("-2nd");
    expect(formatOrdinal(NaN, "en")).toBe("NaNth");
    expect(formatOrdinal(Infinity, "en")).toBe("Infinityth");
    expect(formatOrdinal(-Infinity, "en")).toBe("-Infinityth");
  });
});
