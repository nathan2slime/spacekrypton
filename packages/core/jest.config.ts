import { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  transformIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['node_modules'],
  testMatch: ['**/tests/**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
    react: {
      version: 'detect',
    },
  },
};

export default config;
