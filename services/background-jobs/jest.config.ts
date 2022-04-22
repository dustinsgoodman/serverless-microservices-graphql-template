module.exports = {
  displayName: 'background-jobs',

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: '../../coverage/services/background-jobs',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  preset: '../../jest.preset.ts',
};
