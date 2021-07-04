import type { Config } from '@jest/types';
import { defaults } from 'jest-config';

const config: Config.InitialOptions = {
  ...defaults,
  verbose: true,
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js'],
  // testMatch: ['<rootDir>/src/tests/*.ts'], // So test scripts can match different test directories
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

export default config;
