const toHex = <TArrayBuffer extends ArrayBufferLike = ArrayBufferLike>(
  data: Uint8Array<TArrayBuffer> | Omit<Uint8Array<TArrayBuffer>, "toHex">,
): string => {
  if ("toHex" in data) {
    return data.toHex();
  }

  return data.reduce((acc, byte) => {
    return acc + byte.toString(16).padStart(2, "0");
  }, "");
};

export { toHex };
