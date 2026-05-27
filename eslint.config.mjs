import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import prettier from "eslint-config-prettier";
import markdown from "eslint-plugin-markdown";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

// https://vitest.dev/config/include.html#include
const TEST_GLOB_PATTERNS = ["**/*.{test,spec}.?(c|m)[jt]s?(x)"];

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
    name: "@exifi/eslint-config/test.js",
    extends: [vitest.configs.recommended],
    files: TEST_GLOB_PATTERNS,
    rules: {
      /**
       * @see {@link https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-importing-vitest-globals.md}
       */
      "vitest/prefer-importing-vitest-globals": "error",
      /**
       * @see {@link https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/consistent-test-it.md}
       */
      "vitest/consistent-test-it": [
        "error",
        { fn: "test", withinDescribe: "test" },
      ],
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
  },
  {
    files: ["**/*.?(c|m)js", "**/*.md/*"],
    ...tseslint.configs.disableTypeChecked,
  },
  prettier,
);
