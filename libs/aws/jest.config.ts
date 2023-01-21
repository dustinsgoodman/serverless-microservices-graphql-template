/* eslint-disable */
export default {
	displayName: 'aws',

	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.spec.json',
		},
	},
	testEnvironment: 'node',
	collectCoverage: true,
	coverageDirectory: '../../coverage/libs/aws',
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
