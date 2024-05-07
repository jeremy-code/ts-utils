import {
  formatMs,
  formatMsExact,
  MS_PER_DAY,
  MS_PER_HOUR,
  MS_PER_MINUTE,
  MS_PER_SECOND,
} from "./formatMs";

describe("conversion constants", () => {
  describe("return correct values for conversion constants", () => {
    it.each([
      [MS_PER_SECOND, 1000],
      [MS_PER_MINUTE, 60_000],
      [MS_PER_HOUR, 3_600_000],
      [MS_PER_DAY, 86_400_000],
    ])(
      "conversion constants are correct for %d ms",
      (expected: number, actual: number) => {
        expect(expected).toBe(actual);
      },
    );
  });
});

describe("formatMs function", () => {
  describe("return formatted ms for base units", () => {
    it.each([
      [1, "1 ms"],
      [1000, "1 sec"],
      [60_000, "1 min"],
      [3_600_000, "1 hr"],
      [864_000_00, "1 day"],
    ])("formats %d ms as %s", (ms: number, expected: string) => {
      expect(formatMs(ms)).toBe(expected);
    });
  });

  describe("return formatted ms for multiples", () => {
    it.each([
      [500, "500 ms"],
      [10_000, "10 sec"],
      [600_000, "10 min"],
      [36_000_000, "10 hr"],
      [864_000_000, "10 days"],
    ])("formats %d ms as %s", (ms: number, expected: string) => {
      expect(formatMs(ms)).toBe(expected);
    });
  });

  describe("return formatted ms for fractional values", () => {
    it.each([
      [1234, "1.234 sec"],
      [123_456, "2.058 min"],
      [12_345_678, "3.429 hr"],
      [123_456_789, "1.429 days"],
    ])("formats %d ms as %s", (ms: number, expected: string) => {
      expect(formatMs(ms)).toBe(expected);
    });
  });

  describe("return formatted ms compactly", () => {
    const options: Intl.NumberFormatOptions = {
      notation: "compact",
      unitDisplay: "narrow",
    };

    it.each([
      // base units
      [1, "1ms"],
      [1000, "1s"],
      [60_000, "1m"],
      [3_600_000, "1h"],
      [864_000_00, "1d"],

      // multiples
      [500, "500ms"],
      [10_000, "10s"],
      [600_000, "10m"],
      [36_000_000, "10h"],
      [864_000_000, "10d"],
    ])("formats %d ms as %s", (ms: number, expected: string) => {
      expect(formatMs(ms, "en", options)).toBe(expected);
    });
  });
});

describe("formatMsExact function", () => {
  describe("return formatted ms for base units", () => {
    it.each([
      [1, "1 ms"],
      [1000, "1 sec"],
      [60_000, "1 min"],
      [3_600_000, "1 hr"],
      [864_000_00, "1 day"],
    ])("formats %d ms as %s", (ms: number, expected: string) => {
      expect(formatMsExact(ms)).toBe(expected);
    });
  });

  describe("return formatted ms for multiple units", () => {
    it.each([
      [12_345, "12 sec 345 ms"],
      [123_456, "2 min 3 sec 456 ms"],
      [1_234_567, "20 min 34 sec 567 ms"],
      [12_345_678, "3 hr 25 min 45 sec 678 ms"],
      [123_456_789, "1 day 10 hr 17 min 36 sec 789 ms"],
    ])("formats %d ms as %s", (ms: number, expected: string) => {
      expect(formatMsExact(ms)).toBe(expected);
    });
  });

  describe("return formatted ms compactly for base units", () => {
    const options: Intl.NumberFormatOptions = {
      notation: "compact",
      unitDisplay: "narrow",
    };

    it.each([
      [1, "1ms"],
      [1000, "1s"],
      [60_000, "1m"],
      [3_600_000, "1h"],
      [864_000_00, "1d"],
    ])("formats %d ms as %s", (ms: number, expected: string) => {
      expect(formatMsExact(ms, "en", options)).toBe(expected);
    });
  });

  describe("return formatted ms compactly for multiple units", () => {
    const options: Intl.NumberFormatOptions = {
      notation: "compact",
      unitDisplay: "narrow",
    };

    it.each([
      [12_345, "12s 345ms"],
      [123_456, "2m 3s 456ms"],
      [1_234_567, "20m 34s 567ms"],
      [12_345_678, "3h 25m 45s 678ms"],
      [123_456_789, "1d 10h 17m 36s 789ms"],
    ])("formats %d ms as %s", (ms: number, expected: string) => {
      expect(formatMsExact(ms, "en", options)).toBe(expected);
    });
  });
});
