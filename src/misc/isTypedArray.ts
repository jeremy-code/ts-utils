type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

// https://benediktmeurer.de/2017/10/05/connecting-the-dots/#fast-path-for-typedarrays-in-functionprototypeapply
// https://github.com/nodejs/node/blob/c925e24ae7c884d22b02304b20c709cc0b25914a/lib/internal/util/types.js
const TypedArrayPrototype: unknown = Object.getPrototypeOf(
  Uint8Array.prototype,
);

const typedArrayToStringTag: (this: unknown) => unknown =
  // eslint-disable-next-line @typescript-eslint/unbound-method
  Object.getOwnPropertyDescriptor(
    TypedArrayPrototype,
    Symbol.toStringTag,
  )!.get!;

const isTypedArray = (value: unknown): value is TypedArray => {
  return (
    ArrayBuffer.isView(value) &&
    Reflect.apply(typedArrayToStringTag, value, []) !== undefined
  );
};

export { isTypedArray };
