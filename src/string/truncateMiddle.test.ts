import { describe, expect, test } from "vitest";

import { truncateMiddle } from "./truncateMiddle";

describe("truncateMiddle", () => {
  test("should truncate the middle of a long string", () => {
    expect(
      truncateMiddle("This is a long string that needs to be truncated", 20),
    ).toEqual("This is a...runcated");
  });

  test("should not truncate a short string", () => {
    const text = "Short string";
    const result = truncateMiddle(text, 20);
    expect(result).toEqual(text);
  });

  test("should andle custom placeholder", () => {
    expect(
      truncateMiddle(
        "This is a long string that needs to be truncated",
        20,
        "***",
      ),
    ).toEqual("This is a***runcated");
  });
});
