/* eslint-disable import/no-commonjs, functional/immutable-data */
const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig');

const config = {
  testMatch: ['**/tests/**/*.test.ts'],
  preset: 'ts-jest',
  transform: { '^.+\\.ts?$': 'ts-jest' },
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  transformIgnorePatterns: [],
  coverageReporters: ['text'],
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.ts', '!**/tests/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

module.exports = {
  projects: [
    Object.assign(
      {
        displayName: 'browser',
        testEnvironment: 'jsdom',
        testPathIgnorePatterns: [
          // ignored paths
        ],
      },
      config
    ),
    Object.assign(
      {
        displayName: 'node',
        testEnvironment: 'node',
        testPathIgnorePatterns: [
          // ignored paths
        ],
      },
      config
    ),
  ],
};
