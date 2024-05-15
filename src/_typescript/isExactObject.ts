/**
 * @file Given some object and a schema, checks if the object is an exact match to the schema
 *
 * More of a thought experiment, as you would likely use a library like zod, yup, or valibot
 * to do runtime validation.
 */

import type { Typeof, TypeofType } from "./typePredicates";

type Schema = {
  [key: string]: Typeof | Schema;
};

// Recursive definition, so TypeScript can resolve the type
type SchemaObject<T extends Schema | Typeof> =
  T extends Schema ?
    {
      [K in keyof T]: T[K] extends Typeof | Schema ? SchemaObject<T[K]> : never;
    }
  : T extends Typeof ? TypeofType<T>
  : never;

const isRecordStringUnknown = (
  value: unknown,
): value is Record<string, unknown> =>
  value !== null &&
  typeof value === "object" &&
  Object.getOwnPropertySymbols(value).length === 0; // No symbols, excludes Arrays, Maps, Sets, etc.

/**
 * Given some object and a schema, checks if the object is an exact match to the
 * schema (every listed property exists with the correct type). Does not allow
 * optional or additional properties. Also, null is "object".
 *
 * Works with nested objects. Objects given must be have no symbols.
 */
export function isExactObject<T extends Schema>(
  obj: unknown,
  schema: T,
): obj is SchemaObject<T> {
  if (!isRecordStringUnknown(obj) || Object.keys(obj) !== Object.keys(schema)) {
    return false;
  }

  // Does not check for order
  return Object.entries(obj).every(([key, value]) => {
    const type = schema[key];

    if (!(key in schema) || type === undefined) {
      return false;
    }

    return (
      typeof type === "string" ? typeof value === type
      : isRecordStringUnknown(value) && isRecordStringUnknown(type) ?
        isExactObject(value, type)
      : false
    );
  });
}
