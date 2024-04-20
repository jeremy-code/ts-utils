import {
  capitalize,
  capitalize1,
  capitalize2,
  uncapitalize,
} from "./capitalize";

describe("capitalize functions", () => {
  test("capitalize: should capitalize the first letter of a string", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  test("capitalize: should handle an empty string", () => {
    expect(capitalize("")).toBe("");
  });

  test("capitalize1: should capitalize the first letter of a string", () => {
    expect(capitalize1("world")).toBe("World");
  });

  test("capitalize1: should handle an empty string", () => {
    expect(capitalize1("")).toBe("");
  });

  test("capitalize2: should capitalize the first letter of a string", () => {
    expect(capitalize2("testString")).toBe("TestString");
  });

  test("capitalize2: should handle an empty string", () => {
    expect(capitalize2("")).toBe("");
  });
});

describe("uncapitalize function", () => {
  test("uncapitalize: should uncapitalize the first letter of a string", () => {
    expect(uncapitalize("Hello")).toBe("hello");
  });

  test("uncapitalize: should handle an empty string", () => {
    expect(uncapitalize("")).toBe("");
  });
});
