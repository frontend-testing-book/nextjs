/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:storybook/recommended",
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  plugins: [
    "jest-dom",
    "testing-library",
    "@typescript-eslint",
    'import',
  ],
  rules: {
    "@next/next/no-img-element": "off",
    "react/no-children-prop": "off",
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        pathGroups: [
          {
            pattern: '@/utils/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/libs/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/hooks/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/const/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/types/**',
            group: 'internal',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  root: true
}
