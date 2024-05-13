import { hexToRgb, rgbToHex } from "./color";

describe("hexToRgb function", () => {
  it.each([
    ["#000000", { r: 0, g: 0, b: 0 }],
    ["#ffffff", { r: 255, g: 255, b: 255 }],
    ["#FF5733", { r: 255, g: 87, b: 51 }],
    ["#123", { r: 17, g: 34, b: 51 }],
    ["123456", { r: 18, g: 52, b: 86 }],
  ])("converts %s to %o", (hex, expectedRgb) => {
    expect(hexToRgb(hex)).toEqual(expectedRgb);
  });
});

describe("rgbToHex function", () => {
  it.each([
    [{ r: 0, g: 0, b: 0 }, "#000000"],
    [{ r: 255, g: 255, b: 255 }, "#ffffff"],
    [{ r: 255, g: 87, b: 51 }, "#ff5733"],
  ])("converts %o to %s", (rgb, expectedHex) => {
    expect(rgbToHex(rgb)).toBe(expectedHex);
  });
});
