/**
 * A tagged template literal for encoding URI components.
 *
 * In the future, this may be simplified with the `String.cooked` proposal
 * {@link https://github.com/tc39/proposal-string-cooked}
 *
 * @example uri`https://example.com/${name}` // https://example.com/John%20Doe
 */
export const uri = (
  template: TemplateStringsArray,
  // valid values for encodeURIComponent
  ...values: (string | number | boolean)[]
) => String.raw({ raw: template }, ...values.map((v) => encodeURIComponent(v)));
