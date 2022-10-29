/* eslint-disable @typescript-eslint/no-var-requires */
import type { LambdaClient } from '@aws-sdk/client-lambda';

describe('getClient', () => {
	const OLD_ENV = process.env;
	let subject;
	let LambdaClient: LambdaClient;

	describe('when IS_OFFLINE is true', () => {
		beforeAll(() => {
			jest.resetModules();
			LambdaClient = require('@aws-sdk/client-lambda').LambdaClient;
			const { getClient } = require('./client');
			process.env = {
				...OLD_ENV,
				IS_OFFLINE: 'true',
			};
			subject = getClient('public-api');
		});

		afterAll(() => {
			process.env = OLD_ENV;
		});

		it('returns an LambdaClient', () => {
			expect(subject).toEqual(expect.any(LambdaClient));
		});

		it('sets the endpoint to localhost', async () => {
			expect(subject.config.isCustomEndpoint).toBe(true);
			const { hostname } = await subject.config.endpoint();
			expect(hostname).toMatch(/localhost/);
		});
	});

	describe('when IS_OFFLINE is false', () => {
		beforeAll(() => {
			jest.resetModules();
			LambdaClient = require('@aws-sdk/client-lambda').LambdaClient;
			const { getClient } = require('./client');
			process.env = {
				...OLD_ENV,
				IS_OFFLINE: 'false',
			};
			subject = getClient('public-api');
		});

		afterAll(() => {
			process.env = OLD_ENV;
		});

		it('returns an LambdaClient', () => {
			expect(subject).toEqual(expect.any(LambdaClient));
		});

		it('uses the default AWS Lambda endpoint', async () => {
			expect(subject.config.isCustomEndpoint).toBe(false);
		});
	});

	describe('when called twice', () => {
		let client;

		beforeAll(() => {
			jest.resetModules();

			client = require('@aws-sdk/client-lambda');
			jest.doMock('@aws-sdk/client-lambda', () => ({
				LambdaClient: jest
					.fn()
					.mockImplementation(() => new client.LambdaClient({})),
			}));
			LambdaClient = require('@aws-sdk/client-lambda').LambdaClient;

			const { getClient } = require('./client');
			process.env = {
				...OLD_ENV,
				IS_OFFLINE: 'true',
			};
			getClient('public-api');
			subject = getClient('public-api');
		});

		afterAll(() => {
			process.env = OLD_ENV;
		});

		it('runs the constructor once', () => {
			expect(LambdaClient).toHaveBeenCalledTimes(1);
		});

		it('returns a cached client', () => {
			expect(subject).toEqual(expect.any(client.LambdaClient));
		});
	});
});
