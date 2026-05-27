import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import markdown from "eslint-plugin-markdown";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
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
  },
  {
    files: ["**/*.?(c|m)js", "**/*.md/*"],
    ...tseslint.configs.disableTypeChecked,
  },
  prettier,
);
