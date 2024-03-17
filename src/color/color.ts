// no support for alpha channel/transparency
type RGB = {
  r: number;
  g: number;
  b: number;
};

export const hexToRgb = (hex: string): RGB => {
  const hexValue = hex.startsWith("#") ? hex.slice(1) : hex;
  const fullHex =
    hexValue.length === 3 || hexValue.length === 4
      ? [...hexValue].map((char) => char.repeat(2)).join("")
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
