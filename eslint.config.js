import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default [
  // Global ignores - must be the first config object
  {
    ignores: [
      ".amplify/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "amplify_outputs.json",
      "**/*.config.js",
      "vite.config.js",
    ],
  },
  // React and JavaScript configuration
  {
    files: ["**/*.{js,jsx}"],
    ...js.configs.recommended,
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: globals.browser,
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off", // Disable prop-types since we're not using TypeScript
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
