 const { pathsToModuleNameMapper } = require('ts-jest');
 const { compilerOptions } = require('../../tsconfig');

module.exports = {
  rootDir: '../../',
  verbose: true,
  restoreMocks: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/config/test/setup-after.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
