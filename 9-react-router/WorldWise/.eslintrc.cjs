module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
      "eslint:recommended",
      "react-app",  // Added this from eslintrc.json
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: { react: { version: "18.2" } },
    plugins: ["react-refresh"],
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Added rules from eslintrc.json
      "react/prop-types": "off",
      "no-unused-vars": "off"
    },
  };
  