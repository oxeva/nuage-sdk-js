module.exports = {
    collectCoverageFrom: ['./src/**/*.js'],
    coverageReporters: ['text', 'text-summary', 'cobertura'],
    setupFilesAfterEnv: ['jest-extended/all', './tests/setupTest.js'],
    testEnvironment: 'jsdom',
    globals: {
        window: {},
        navigator: {},
    },
};
