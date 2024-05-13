import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import jest from "eslint-plugin-jest";
import markdown from "eslint-plugin-markdown";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...markdown.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.test.?(c|m){js,ts}"],
    ...jest.configs["flat/recommended"],
  },
  {
    files: ["**/*.?(c|m)js", "**/*.md/*"],
    ...tseslint.configs.disableTypeChecked,
  },
  prettier,
);
