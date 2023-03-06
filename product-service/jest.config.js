module.exports = {
    verbose: true,
    moduleDirectories: [
      "node_modules",
      "src"
    ],
    testEnvironment: "node",
    transformIgnorePatterns: [
      "node_modules/(?!variables/.*)"
    ],
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    }
  };