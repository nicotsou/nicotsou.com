module.exports = {
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|svg|woff|woff2)$": "<rootDir>/__mocks__/fileMock.js",
    // Plain CSS - match css files that don't end with '.module.css' https://regex101.com/r/VzwrKH/4
    "^(?!.*\\.module\\.css$).*\\.css$": "<rootDir>/__mocks__/styleMock.js",
    // CSS Modules - match files that end with 'module.css'
    "\\.module\\.css$": "identity-obj-proxy" // CSS modules
  },
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/.cache/"],
  setupTestFrameworkScriptFile: "jest-enzyme",
  testEnvironment: "enzyme",
  globals: {
    __PATH_PREFIX__: ""
  }
};