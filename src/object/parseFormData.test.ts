import { parseFormData } from "./parseFormData";

describe("parseFormData", () => {
  it("parses FormData with single values correctly", () => {
    const formData = new FormData();
    formData.append("key1", "value1");
    formData.append("key2", "value2");

    const expected = {
      key1: "value1",
      key2: "value2",
    };

    expect(parseFormData(formData)).toEqual(expected);
  });

  it("parses FormData with multiple values for the same key correctly", () => {
    const formData = new FormData();
    formData.append("key1", "value1");
    formData.append("key1", "value2");

    const expected = {
      key1: ["value1", "value2"],
    };

    expect(parseFormData(formData)).toEqual(expected);
  });

  it("handles mixed single and multiple values correctly", () => {
    const formData = new FormData();
    formData.append("key1", "value1");
    formData.append("key2", "value2");
    formData.append("key2", "value3");

    const expected = {
      key1: "value1",
      key2: ["value2", "value3"],
    };

    expect(parseFormData(formData)).toEqual(expected);
  });
});
