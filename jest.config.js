//https://jestjs.io/docs/configuration
module.exports = {
    verbose: true,
    testMatch: ["**/tests/**/*.test.js"],
    testResultsProcessor: "jest-jenkins-reporter",
}