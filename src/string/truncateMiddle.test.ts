import { truncateMiddle } from "./truncateMiddle";

describe("truncateMiddle", () => {
  it("should truncate the middle of a long string", () => {
    const text = "This is a long string that needs to be truncated";
    const maxLength = 20;
    const expected = "This is a...runcated";
    const result = truncateMiddle(text, maxLength);
    expect(result).toEqual(expected);
  });

  it("should not truncate a short string", () => {
    const text = "Short string";
    const maxLength = 20;
    const expected = "Short string";
    const result = truncateMiddle(text, maxLength);
    expect(result).toEqual(expected);
  });

  it("should handle custom placeholder", () => {
    const text = "This is a long string that needs to be truncated";
    const maxLength = 20;
    const placeholder = "***";
    const expected = "This is a***runcated";
    const result = truncateMiddle(text, maxLength, placeholder);
    expect(result).toEqual(expected);
  });
});
