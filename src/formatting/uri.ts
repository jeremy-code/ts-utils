/**
 * In the future, this may be simplified with the `String.cooked` proposal
 * {@link https://github.com/tc39/proposal-string-cooked}
 */
export const uri = (
  template: TemplateStringsArray,
  // valid values for encodeURIComponent
  ...values: (string | number | boolean)[]
) => String.raw({ raw: template }, ...values.map((v) => encodeURIComponent(v)));
