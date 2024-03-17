// preference for .charAt() over array indexing [] in case of empty string ""

export const capitalize = <T extends string>(str: T) =>
  `${str.charAt(0).toUpperCase()}${str.substring(1)}` as Capitalize<T>;

export const capitalize1 = ([first, ...rest]: string) =>
  `${first?.toUpperCase()}${rest.join("")}`;

export const capitalize2 = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const uncapitalize = <T extends string>(str: T) =>
  `${str.charAt(0).toLowerCase()}${str.substring(1)}` as Uncapitalize<T>;
