import {
  capitalize,
  capitalize1,
  capitalize2,
  uncapitalize,
} from "./capitalize";

describe.each([
  ["capitalize", capitalize],
  ["capitalize1", capitalize1],
  ["capitalize2", capitalize2],
])("%s function", (_name, fn) => {
  it.each([
    ["hello", "Hello"],
    ["world", "World"],
    ["testString", "TestString"],
    ["", ""],
  ])("should capitalize the first letter of '%s'", (input, expected) => {
    expect(fn(input)).toBe(expected);
  });
});

describe("uncapitalize function", () => {
  it.each([
    ["Hello", "hello"],
    ["World", "world"],
    ["TestString", "testString"],
    ["", ""],
  ])("should uncapitalize the first letter of '%s'", (input, expected) => {
    expect(uncapitalize(input)).toBe(expected);
  });
});
