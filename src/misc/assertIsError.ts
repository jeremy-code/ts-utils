/**
 * Useful in try/catch blocks to ensure `error: unknown` is an Error without
 * having to wrap error handling in `if (Error.isError(error))`
 */
export function assertIsError(error: unknown): asserts error is Error {
  if (!Error.isError(error)) {
    throw new Error(`Expected an Error but got ${typeof error}`, {
      cause: error,
    });
  }
}
