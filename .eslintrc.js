/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: ["next/core-web-vitals", "plugin:storybook/recommended"],
  plugins: ["jest-dom", "testing-library"],
  rules: {
    "@next/next/no-img-element": "off",
    "react/no-children-prop": "off"
  }
}
