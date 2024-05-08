module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  parser: "@typescript-eslint/parser", // Set the TypeScript parser
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended", // Use recommended TypeScript rules
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the version of React
    },
  },
  plugins: [
    "react-refresh",
    "@typescript-eslint", // Include the TypeScript plugin
  ],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react/prop-types":"off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // You can add or modify TypeScript-specific rules here
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
};
