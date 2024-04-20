import { formatNumber } from "./formatNumber";

describe("formatNumber", () => {
  test("should correctly format a number without locale or options", () => {
    expect(formatNumber(123456)).toBe("123,456");
  });

  test("should correctly format a number with locale", () => {
    expect(formatNumber(123456, "de-DE")).toBe("123.456");
  });

  test("should correctly format a number with locale and options", () => {
    expect(
      formatNumber(123456.789, "en-US", { style: "currency", currency: "USD" }),
    ).toBe("$123,456.79");
  });

  test("should handle non-number inputs", () => {
    expect(formatNumber("abc")).toBe("NaN");
    expect(formatNumber(null)).toBe("0");
    expect(formatNumber(undefined)).toBe("NaN");
  });

  test("should handle edge cases", () => {
    expect(formatNumber(NaN)).toBe("NaN");
    expect(formatNumber(Infinity)).toBe("∞");
    expect(formatNumber(-Infinity)).toBe("-∞");
  });
});
