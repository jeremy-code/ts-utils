/**
 * Some color utilities. Unfortunately, color manipulation in general is really
 * complicated, and a task more befitting of a library than a handful of utility
 * functions. If you need to do anything more complicated than what's here, see
 * the libraries: color, color-string, d3-color, colord, tinycolor2, chroma-js,
 * etc. Or, if you're using a CSS-in-JS library, it might have color utilities
 * built in.
 *
 * If you want to see a more complex set of color manipulation utils, see
 * {@link https://github.com/microsoft/vscode/blob/main/src/vs/base/common/color.ts}
 */

// no support for alpha channel/transparency
type RGB = {
  r: number;
  g: number;
  b: number;
};

export const hexToRgb = (hex: string): RGB => {
  const hexValue = hex.startsWith("#") ? hex.slice(1) : hex;
  const fullHex =
    hexValue.length === 3 || hexValue.length === 4 ?
      [...hexValue].map((char) => char.repeat(2)).join("")
    : hexValue;

  const bigint = parseInt(fullHex, 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

export const rgbToHex = ({ r, g, b }: RGB) =>
  `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
