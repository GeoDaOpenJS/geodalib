/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: '../../jest.config.mjs',
  moduleNameMapper: {
    '^@geoda/common$': '<rootDir>/../common/src/index.ts',
  },
  setupFilesAfterEnv: ['./test/setup.ts'],
};
