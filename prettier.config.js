/** @type {import("prettier").Config} */
module.exports = {
  experimentalTernaries: true,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  // plugin options
  importOrder: ["<BUILTIN_MODULES>", "<THIRD_PARTY_MODULES>", "", "^[.]"],
  importOrderParserPlugins: ["typescript"],
  importOrderTypeScriptVersion: "5.4.5",
};
