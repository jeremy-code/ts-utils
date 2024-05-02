import {
  formatMs,
  formatMsExact,
  MS_PER_DAY,
  MS_PER_HOUR,
  MS_PER_MINUTE,
  MS_PER_SECOND,
} from "./formatMs";

describe("conversion constants", () => {
  test("conversion constants are correct", () => {
    expect(MS_PER_SECOND).toBe(1000);
    expect(MS_PER_MINUTE).toBe(60_000);
    expect(MS_PER_HOUR).toBe(3_600_000);
    expect(MS_PER_DAY).toBe(86_400_000);
  });
});

describe("formatMs", () => {
  test("formats ms correctly", () => {
    // base units
    expect(formatMs(1)).toBe("1 ms");
    expect(formatMs(1000)).toBe("1 sec");
    expect(formatMs(60_000)).toBe("1 min");
    expect(formatMs(3_600_000)).toBe("1 hr");
    expect(formatMs(864_000_00)).toBe("1 day");

    // multiples
    expect(formatMs(500)).toBe("500 ms");
    expect(formatMs(10_000)).toBe("10 sec");
    expect(formatMs(600_000)).toBe("10 min");
    expect(formatMs(36_000_000)).toBe("10 hr");
    expect(formatMs(864_000_000)).toBe("10 days");

    // fractional
    expect(formatMs(1234)).toBe("1.234 sec");
    expect(formatMs(123_456)).toBe("2.058 min");
    expect(formatMs(12_345_678)).toBe("3.429 hr");
    expect(formatMs(123_456_789)).toBe("1.429 days");
  });

  test("format ms compactly", () => {
    const options: Intl.NumberFormatOptions = {
      notation: "compact",
      unitDisplay: "narrow",
    };

    // base units
    expect(formatMs(1, "en", options)).toBe("1ms");
    expect(formatMs(1000, "en", options)).toBe("1s");
    expect(formatMs(60_000, "en", options)).toBe("1m");
    expect(formatMs(3_600_000, "en", options)).toBe("1h");
    expect(formatMs(864_000_00, "en", options)).toBe("1d");

    // multiples
    expect(formatMs(500, "en", options)).toBe("500ms");
    expect(formatMs(10_000, "en", options)).toBe("10s");
    expect(formatMs(600_000, "en", options)).toBe("10m");
    expect(formatMs(36_000_000, "en", options)).toBe("10h");
    expect(formatMs(864_000_000, "en", options)).toBe("10d");
  });
});

describe("formatMsExact", () => {
  test("formats ms correctly", () => {
    // base units
    expect(formatMsExact(1)).toBe("1 ms");
    expect(formatMsExact(1000)).toBe("1 sec");
    expect(formatMsExact(60_000)).toBe("1 min");
    expect(formatMsExact(3_600_000)).toBe("1 hr");
    expect(formatMsExact(864_000_00)).toBe("1 day");

    // multiple units
    expect(formatMsExact(12_345)).toBe("12 sec 345 ms");
    expect(formatMsExact(123_456)).toBe("2 min 3 sec 456 ms");
    expect(formatMsExact(1_234_567)).toBe("20 min 34 sec 567 ms");
    expect(formatMsExact(12_345_678)).toBe("3 hr 25 min 45 sec 678 ms");
    expect(formatMsExact(123_456_789)).toBe("1 day 10 hr 17 min 36 sec 789 ms");
  });

  test("format ms exact compactly", () => {
    const options: Intl.NumberFormatOptions = {
      notation: "compact",
      unitDisplay: "narrow",
    };

    // base units
    expect(formatMsExact(1, "en", options)).toBe("1ms");
    expect(formatMsExact(1000, "en", options)).toBe("1s");
    expect(formatMsExact(60_000, "en", options)).toBe("1m");
    expect(formatMsExact(3_600_000, "en", options)).toBe("1h");
    expect(formatMsExact(864_000_00, "en", options)).toBe("1d");

    // multiple units
    expect(formatMsExact(12_345, "en", options)).toBe("12s 345ms");
    expect(formatMsExact(123_456, "en", options)).toBe("2m 3s 456ms");
    expect(formatMsExact(1_234_567, "en", options)).toBe("20m 34s 567ms");
    expect(formatMsExact(12_345_678, "en", options)).toBe("3h 25m 45s 678ms");
    expect(formatMsExact(123_456_789, "en", options)).toBe(
      "1d 10h 17m 36s 789ms",
    );
  });
});
