export const parseUrlSearchParams = (urlSearchParams: URLSearchParams) =>
  Array.from(urlSearchParams).reduce<Record<string, string | string[]>>(
    (acc, [k, v]) => {
      if (!acc[k]) {
        const values = urlSearchParams.getAll(k);
        acc[k] = values.length > 1 ? values : v;
      }
      return acc;
    },
    {},
  );
