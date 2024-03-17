import { hexToRgb, rgbToHex } from "./color";

describe("hexToRgb", () => {
  test("converts #000000 to rgb(0, 0, 0)", () => {
    expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
  });

  test("converts #ffffff to rgb(255, 255, 255)", () => {
    expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
  });

  test("converts #FF5733 to rgb(255, 87, 51)", () => {
    expect(hexToRgb("#FF5733")).toEqual({ r: 255, g: 87, b: 51 });
  });

  test("handles shorthand hex format", () => {
    expect(hexToRgb("#123")).toEqual({ r: 17, g: 34, b: 51 });
  });

  test("handles hex without # prefix", () => {
    expect(hexToRgb("123456")).toEqual({ r: 18, g: 52, b: 86 });
  });
});

describe("rgbToHex", () => {
  test("converts rgb(0, 0, 0) to #000000", () => {
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe("#000000");
  });

  test("converts rgb(255, 255, 255) to #ffffff", () => {
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe("#ffffff");
  });

  test("converts rgb(255, 87, 51) to #ff5733", () => {
    expect(rgbToHex({ r: 255, g: 87, b: 51 })).toBe("#ff5733");
  });
});
