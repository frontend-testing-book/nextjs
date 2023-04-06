// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  collectCoverage: false,
  coverageDirectory: "coverage",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/e2e/"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "__reports__",
        filename: "jest.html",
      },
    ],
  ],
};

// FYI: https://github.com/vercel/next.js/issues/36230
// FYI: https://github.com/vercel/next.js/issues/35634#issuecomment-1080942525
async function jestConfig() {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
    transformIgnorePatterns: [`/node_modules/(?!${["uuid"].join("|")})`],
    moduleNameMapper: {
      "\\.(gif|ttf|eot|svg)$": "<rootDir>/jest.fileMock.js",
      ...nextJestConfig.moduleNameMapper,
    },
  };
}

module.exports = jestConfig;
