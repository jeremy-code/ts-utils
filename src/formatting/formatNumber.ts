/**
 * Coerces a value to a number and formats it using the provided options.
 */
export const formatNumber = (
  value: unknown,
  ...params: ConstructorParameters<Intl.NumberFormatConstructor>
) => new Intl.NumberFormat(...params).format(Number(value));
