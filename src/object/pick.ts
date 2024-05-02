// equivalent to pick utility type in TypeScript and lodash.pick

export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Pick<T, K> =>
  Object.fromEntries(keys.map((key) => [key, obj[key]])) as Pick<T, K>;

// casting to Pick<T, K> is necessary because Object.fromEntries returns { [k: string]: T; }
// so as long as keys are not symbols, this should be safe
//
// omit is not as common as pick, hence here for completeness
//
// mutable approach, imo more readable may want to change type from { [key:
// string]: unknown } to something else depending on use case
export function omit<T extends { [key: string]: unknown }, K extends keyof T>(
  object: T,
  keys: K[],
): Omit<T, K> {
  const omitted: { [key: string]: unknown } = {};
  Object.keys(object).forEach((key) => {
    if (!keys.includes(key as K)) {
      omitted[key] = object[key];
    }
  });
  return omitted as Omit<T, K>;
}

// immutable approach, chaining Object.entries and Object.fromEntries
export const omit1 = <T extends { [key: string]: unknown }, K extends keyof T>(
  object: T,
  keys: K[],
): Omit<T, K> =>
  Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
