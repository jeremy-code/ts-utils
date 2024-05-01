import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

// plugins
import jest from "eslint-plugin-jest";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  {
    files: ["**/*.{test}.{js,jsx,ts,tsx}"],
    ...jest.configs["flat/recommended"],
  },
  {
    files: ["*.{js,jsx,cjs,mjs}"],
    ...tseslint.configs.disableTypeChecked,
  },
);
