import { formatBytes, formatBytesBinary } from "./formatBytes";

describe("formatBytes function", () => {
  describe("formats base SI units in bytes", () => {
    it.each([
      [1, "1 byte"],
      [1000, "1 kB"],
      [1_000_000, "1 MB"],
      [1_000_000_000, "1 GB"],
      [1_000_000_000_000, "1 TB"],
      [1_000_000_000_000_000, "1 PB"],
    ])("formats %i bytes correctly", (input, expected) => {
      expect(formatBytes(input)).toBe(expected);
    });
  });

  describe("formats zero and negative values in bytes", () => {
    it.each([
      [0, "0 byte"],
      [-0, "-0 byte"],
      [-1, "-1 byte"],
      [-1000, "-1 kB"],
    ])("handles zero and negative values (%i)", (input, expected) => {
      expect(formatBytes(input)).toBe(expected);
    });
  });

  describe("formats non-finite values", () => {
    it.each([
      [NaN, "NaN byte"],
      [Infinity, "∞ byte"],
      [-Infinity, "-∞ byte"],
    ])("handles non-finite values (%s)", (input, expected) => {
      expect(formatBytes(input)).toBe(expected);
    });
  });

  describe("formats bytes with locale and options formatting", () => {
    it.each([
      [1000, "de-DE", undefined, "1 kB"],
      [1_234_567, "de-DE", { maximumSignificantDigits: 3 }, "1,23 MB"],
    ])(
      "applies locale and options formatting correctly (%i, %s, %o)",
      (bytes, locale, options, expected) => {
        expect(formatBytes(bytes, locale, options)).toBe(expected);
      },
    );
  });
});

describe("formatBytesBinary function", () => {
  describe("formats base binary units in bytes", () => {
    it.each([
      [1, "1 byte"],
      [1024, "1 kB"],
      [1_048_576, "1 MB"],
      [1_073_741_824, "1 GB"],
      [1_099_511_627_776, "1 TB"],
      [1_125_899_906_842_624, "1 PB"],
    ])("formats constant  %i bytes correctly", (input, expected) => {
      expect(formatBytesBinary(input)).toBe(expected);
    });

    it.each([
      [2 ** 0, "1 byte"],
      [2 ** 10, "1 kB"],
      [2 ** 20, "1 MB"],
      [2 ** 30, "1 GB"],
      [2 ** 40, "1 TB"],
      [2 ** 50, "1 PB"],
    ])("formats exponents %i bytes correctly", (input, expected) => {
      expect(formatBytesBinary(input)).toBe(expected);
    });
  });

  describe("formats zero and negative values in bytes", () => {
    it.each([
      [0, "0 byte"],
      [-0, "-0 byte"],
      [-1, "-1 byte"],
      [-1024, "-1 kB"],
    ])("handles zero and negative values (%i)", (input, expected) => {
      expect(formatBytesBinary(input)).toBe(expected);
    });
  });

  describe("formats non-finite values", () => {
    it.each([
      [NaN, "NaN byte"],
      [Infinity, "∞ byte"],
      [-Infinity, "-∞ byte"],
    ])("handles non-finite values (%s)", (input, expected) => {
      expect(formatBytesBinary(input)).toBe(expected);
    });
  });

  describe("formats bytes with locale and options formatting", () => {
    it.each([
      [1024, "de-DE", undefined, "1 kB"],
      [1_234_576, "de-DE", { maximumSignificantDigits: 3 }, "1,18 MB"],
    ])(
      "applies locale formatting correctly (%i, %s, %o)",
      (bytes, locale, options, expected) => {
        expect(formatBytesBinary(bytes, locale, options)).toBe(expected);
      },
    );
  });
});
