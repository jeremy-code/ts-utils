export function assertIsError(e: unknown): asserts e is Error {
  if (!(e instanceof Error)) {
    throw new Error(`Expected an Error but got ${e}`, { cause: e });
  }
}
