export const formatNumber = (
  number: unknown,
  ...params: ConstructorParameters<typeof Intl.NumberFormat>
) => new Intl.NumberFormat(...params).format(Number(number));
