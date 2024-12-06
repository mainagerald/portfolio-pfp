import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      'react/prop-types': 'off',
      "react/react-in-jsx-scope": "off", // Disable for React 17+
      "no-unused-vars": "warn",         // Warn about unused variables
      "react/no-unescaped-entities": "off", // Ensure JSX entities are escaped
      "react/display-name": "off",      // Optional: turn off display-name rule
    },
  },
];