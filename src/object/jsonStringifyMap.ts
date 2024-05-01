/**
 * Unfortunately, JSON.stringify does not support Native ES6 Map. A proposal was
 * made {@link https://github.com/DavidBruant/Map-Set.prototype.toJSON} but was
 * rejected in favor of a custom replacer function.
 *
 * An alternative is to extend the Map object with a custom toJSON() method, but
 * extending native JS objects is not recommended.
 *
 * Since this can be implemented in many different ways, here is an opinionated
 * implementation with a replacer and a reviver function.
 *
 * Note that while this is also true for Set, converting between Set and Array
 * is trivial (Array.from(set) and new Set(arr)), which is probably more
 * efficient than a replacer/reviver.
 */

type ObjectifiedMap = {
  type: "Map";
  value: [unknown, unknown][];
};

// Type predicate to check if an object is an ObjectifiedMap
// If only parsing internal data, a cast may be more appropriate
const isObjectifiedMap = (value: unknown): value is ObjectifiedMap =>
  typeof value === "object" &&
  value !== null &&
  "type" in value &&
  value.type === "Map" &&
  "value" in value &&
  Array.isArray(value.value);

// Using unknown rather than the default any for value. Doesn't make a
// difference besides avoiding implicit any
export const mapReplacer = (_key: string, value: unknown) =>
  value instanceof Map ?
    {
      type: "Map",
      value: Array.from(value),
    }
  : value;

export const mapReviver = (_key: string, value: unknown) =>
  isObjectifiedMap(value) ? new Map(value.value) : value;
