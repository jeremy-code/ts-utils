import { formatNumber } from "./formatNumber";

describe("formatNumber function", () => {
  it("returns a formatted number without locale or options", () => {
    expect(formatNumber(123456)).toBe("123,456");
  });

  it("returns a formatted number with locale", () => {
    expect(formatNumber(123456, "de-DE")).toBe("123.456");
  });

  it("returns a formatted number with locale and options", () => {
    expect(
      formatNumber(123456.789, "en-US", { style: "currency", currency: "USD" }),
    ).toBe("$123,456.79");
  });

  describe("handles non-number inputs", () => {
    it.each([
      ["abc", "NaN"],
      [null, "0"],
      [undefined, "NaN"],
      [NaN, "NaN"],
      [Infinity, "∞"],
      [-Infinity, "-∞"],
    ])("handles non-number inputs for %s", (input, expected) => {
      expect(formatNumber(input)).toBe(expected);
    });
  });
});
