import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { toHex } from "./toHex";

describe("toHex", () => {
  describe("when Uint8Array.prototype.toHex exists", () => {
    test("uses native toHex implementation", () => {
      const mockToHex = vi.fn(() => "feedfacecafebeef");
      Uint8Array.prototype.toHex = mockToHex;

      expect(
        toHex(new Uint8Array([0xfe, 0xed, 0xfa, 0xce, 0xca, 0xfe, 0xbe, 0xef])),
      ).toBe("feedfacecafebeef");

      expect(mockToHex).toHaveBeenCalledTimes(1);
    });
  });

  describe("when Uint8Array.prototype.toHex does not exist", () => {
    beforeEach(() => {
      delete (
        Uint8Array.prototype as Omit<Uint8Array, "toHex"> & {
          toHex?: Uint8Array["toHex"];
        }
      ).toHex;
    });

    test("converts bytes to hex using fallback implementation", () => {
      const data = new Uint8Array([0x13, 0x37, 0xbe, 0xef]);
      const reduceSpy = vi.spyOn(data, "reduce");

      expect(toHex(data)).toBe("1337beef");
      expect(reduceSpy).toHaveBeenCalledOnce();
    });

    test("pads single digit hex values", () => {
      expect(toHex(new Uint8Array([0, 1, 10, 15]))).toBe("00010a0f");
    });

    test("returns an empty string for an empty Uint8Array", () => {
      expect(toHex(new Uint8Array([]))).toBe("");
    });
  });
});
