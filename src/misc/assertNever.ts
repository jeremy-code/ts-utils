export default function assertNever(value: never, message?: string): never {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(message ? message : `Unexpected value: ${value}`, {
    cause: value,
  });
}
