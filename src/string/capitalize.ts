/**
 * @file Utility functions for the intrinsic string manipulation types in
 * TypeScript (e.g. capitalize, uncapitalize, uppercase, lowercase). capitalize
 * and uncapitalize are more useful, but uppercase and lowercase are included
 * for completeness.
 *
 * Functions are locale-insensitive and works best in English, and becomes
 * signficantly more complex if one wants locale sensitivity.
 */

// Preference for .charAt() over array indexing [] in case of empty string ""

export const capitalize = <T extends string>(str: T) =>
  `${str.charAt(0).toUpperCase()}${str.substring(1)}` as Capitalize<T>;

export const capitalize1 = ([first, ...rest]: string) =>
  `${(first ?? "").toUpperCase()}${rest.join("")}`;

export const capitalize2 = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const uncapitalize = <T extends string>(str: T) =>
  `${str.charAt(0).toLowerCase()}${str.substring(1)}` as Uncapitalize<T>;

/**
 * uppercase() and lowercase() functions for completeness. Since they are really
 * simple, simply using .toUpperCase() and .toLowerCase() methods and casting
 * should be preferred instead.
 */

export const uppercase = <T extends string>(str: T) =>
  str.toUpperCase() as Uppercase<T>;

export const lowercase = <T extends string>(str: T) =>
  str.toLowerCase() as Lowercase<T>;
