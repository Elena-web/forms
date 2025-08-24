import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/*.test.tsx', '**/*.spec.tsx'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'json', 'html'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/index.tsx',
    '<rootDir>/src/setupTests.ts',
    '\\.d\\.ts$',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

export default config;
