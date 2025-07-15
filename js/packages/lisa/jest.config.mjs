// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: '../../jest.config.mjs',
  moduleNameMapper: {
    '^@geoda/common$': '<rootDir>/../common/src/index.ts',
  },
  setupFilesAfterEnv: ['./test/setup.ts'],
};
