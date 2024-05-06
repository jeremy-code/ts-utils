/**
 * Parse URLSearchParams to plain object.
 */
export const parseUrlSearchParams = (urlSearchParams: URLSearchParams) =>
  Array.from(urlSearchParams).reduce<Record<string, string | string[]>>(
    (acc, [k, v]) => {
      if (!acc[k]) {
        // Returns array only if there are multiple values
        const values = urlSearchParams.getAll(k);
        acc[k] = values.length > 1 ? values : v;
      }
      return acc;
    },
    {},
  );
