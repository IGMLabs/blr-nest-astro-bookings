module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "curly": [
      "off",
      "all"
    ],
    "max-depth": ["warn", { "max": 3 }],
    "max-nested-callbacks": ["warn", { "max": 3 }],
    "max-lines-per-function": ["warn", { "max": 20 }],
    "no-magic-numbers": [
      "warn",
      {
        "detectObjects": false,
        "enforceConst": true,
        "ignore": [
          -1,
          0,
          1,
          2
        ],
        "ignoreArrayIndexes": true
      }
    ],
    "no-multiple-empty-lines": ["warn", { "max": 1, "maxEOF": 1 }],
    "prettier/prettier": ["off", { "endOfLine": "auto" }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  }
};
