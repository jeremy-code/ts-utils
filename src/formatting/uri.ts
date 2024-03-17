export const uri = (
  template: TemplateStringsArray,
  // valid values for encodeURIComponent
  ...values: (string | number | boolean)[]
) => String.raw({ raw: template }, ...values.map((v) => encodeURIComponent(v)));
