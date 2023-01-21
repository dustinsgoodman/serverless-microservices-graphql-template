/* eslint-disable */
export default {
	displayName: 'utils',

	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.spec.json',
		},
	},
	testEnvironment: 'node',
	collectCoverage: true,
	coverageDirectory: '../../coverage/libs/utils',
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
