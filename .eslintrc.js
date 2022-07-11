module.exports = {
  "include": [
    "**/*.config.js", // for *.config.js files
    "**/*.config.ts", // for *.config.js files
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  extends: ["plugin:react/recommended", "airbnb", 'airbnb-typescript', "prettier", "plugin:@typescript-eslint/recommended",],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "import/extensions": 1,
    "import/no-named-as-default": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "prettier/prettier": ["error"],
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },

};
