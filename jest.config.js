const baseConfig = require('./jest-base');

/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '^@root(.*)$': '<rootDir>/src$1',
    '^@common(.*)$': '<rootDir>/src/common$1',
  },
  rootDir: '.',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/**/*.test.ts',
    '!<rootDir>/src/**/__*__/*',
    '!<rootDir>/src/util/testing.ts',
  ],
  cacheDirectory: '<rootDir>/.cache/unit',
};
