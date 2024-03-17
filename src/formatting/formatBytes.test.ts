import { formatBytes } from "./formatBytes";

describe("formatBytes", () => {
  test("formats bytes correctly", () => {
    expect(formatBytes(1)).toBe("1 byte");
    expect(formatBytes(1000)).toBe("1 kB");
    expect(formatBytes(1000000)).toBe("1 MB");
    expect(formatBytes(1000000000)).toBe("1 GB");
    expect(formatBytes(1000000000000)).toBe("1 TB");
    expect(formatBytes(1000000000000000)).toBe("1 PB");
  });

  test("handles zero and negative values", () => {
    expect(formatBytes(0)).toBe("0 bytes");
    expect(formatBytes(-1000)).toBe("0 bytes");
  });

  test("applies locale formatting correctly", () => {
    expect(formatBytes(1000, "de-DE")).toBe("1 kB");
    expect(formatBytes(1234567, "de-DE", { maximumSignificantDigits: 3 })).toBe(
      "1,23 MB"
    );
  });
});
