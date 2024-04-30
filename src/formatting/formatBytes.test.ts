import { formatBytes, formatBytesBinary } from "./formatBytes";

describe("formatBytes", () => {
  test("formats bytes correctly", () => {
    expect(formatBytes(1)).toBe("1 byte");
    expect(formatBytes(1000)).toBe("1 kB");
    expect(formatBytes(1_000_000)).toBe("1 MB");
    expect(formatBytes(1_000_000_000)).toBe("1 GB");
    expect(formatBytes(1_000_000_000_000)).toBe("1 TB");
    expect(formatBytes(1_000_000_000_000_000)).toBe("1 PB");
  });

  test("handles zero and negative values", () => {
    expect(formatBytes(0)).toBe("0 byte");
    expect(formatBytes(-0)).toBe("-0 byte");
    expect(formatBytes(-1)).toBe("-1 byte");
    expect(formatBytes(-1000)).toBe("-1 kB");
  });

  // I cannot imagine a scenario where this would be useful.
  test("handles non-finite values", () => {
    expect(formatBytes(NaN)).toBe("NaN byte");
    expect(formatBytes(Infinity)).toBe("∞ byte");
    expect(formatBytes(-Infinity)).toBe("-∞ byte");
  });

  test("applies locale formatting correctly", () => {
    expect(formatBytes(1000, "de-DE")).toBe("1 kB");
    expect(
      formatBytes(1_234_567, "de-DE", { maximumSignificantDigits: 3 }),
    ).toBe("1,23 MB");
  });
});

describe("formatBytesBinary", () => {
  test("formats bytes correctly", () => {
    expect(formatBytesBinary(1)).toBe("1 byte");
    expect(formatBytesBinary(1024)).toBe("1 kB");
    expect(formatBytesBinary(1_048_576)).toBe("1 MB");
    expect(formatBytesBinary(1_073_741_824)).toBe("1 GB");
    expect(formatBytesBinary(1_099_511_627_776)).toBe("1 TB");
    expect(formatBytesBinary(1_125_899_906_842_624)).toBe("1 PB");

    // using exponents
    expect(formatBytesBinary(2 ** 10)).toBe("1 kB");
    expect(formatBytesBinary(2 ** 20)).toBe("1 MB");
    expect(formatBytesBinary(2 ** 30)).toBe("1 GB");
    expect(formatBytesBinary(2 ** 40)).toBe("1 TB");
    expect(formatBytesBinary(2 ** 50)).toBe("1 PB");
  });

  test("handles zero and negative values", () => {
    expect(formatBytesBinary(0)).toBe("0 byte");
    expect(formatBytesBinary(-0)).toBe("-0 byte");
    expect(formatBytesBinary(-1)).toBe("-1 byte");
    expect(formatBytesBinary(-1024)).toBe("-1 kB");
  });

  test("handles non-finite values", () => {
    expect(formatBytesBinary(NaN)).toBe("NaN byte");
    expect(formatBytesBinary(Infinity)).toBe("∞ byte");
    expect(formatBytesBinary(-Infinity)).toBe("-∞ byte");
  });

  test("applies locale formatting correctly", () => {
    expect(formatBytesBinary(1024, "de-DE")).toBe("1 kB");
    expect(
      formatBytesBinary(1_234_576, "de-DE", { maximumSignificantDigits: 3 }),
    ).toBe("1,18 MB");
  });
});
