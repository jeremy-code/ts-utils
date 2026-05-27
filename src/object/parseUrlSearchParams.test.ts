import { describe, expect, test } from "vitest";

import { parseUrlSearchParams } from "./parseUrlSearchParams";

describe("parseUrlSearchParams", () => {
  test("should return an empty object when there are no search parameters", () => {
    const urlSearchParams = new URLSearchParams();
    const parsed = parseUrlSearchParams(urlSearchParams);
    expect(parsed).toEqual({});
  });

  test("should handle a single parameter with a single value", () => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("key", "value");
    const parsed = parseUrlSearchParams(urlSearchParams);
    expect(parsed).toEqual({ key: "value" });
  });

  test("should handle multiple parameters with single values", () => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("first", "value1");
    urlSearchParams.append("second", "value2");
    const parsed = parseUrlSearchParams(urlSearchParams);
    expect(parsed).toEqual({ first: "value1", second: "value2" });
  });

  test("should combine multiple values for the same parameter into an array", () => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("key", "value1");
    urlSearchParams.append("key", "value2");
    const parsed = parseUrlSearchParams(urlSearchParams);
    expect(parsed).toEqual({ key: ["value1", "value2"] });
  });

  test("should handle mixed single and multiple values for parameters", () => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("single", "value");
    urlSearchParams.append("multi", "value1");
    urlSearchParams.append("multi", "value2");
    const parsed = parseUrlSearchParams(urlSearchParams);
    expect(parsed).toEqual({ single: "value", multi: ["value1", "value2"] });
  });
});
