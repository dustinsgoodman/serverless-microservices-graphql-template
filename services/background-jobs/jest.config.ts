/* eslint-disable */
export default {
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
	coverageReporters: ['json'],
	preset: '../../jest.preset.js',
};
