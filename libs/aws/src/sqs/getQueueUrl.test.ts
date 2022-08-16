import { mockClient } from 'aws-sdk-client-mock';
import { SQSClient, GetQueueUrlCommand } from '@aws-sdk/client-sqs';
import { getQueueUrl } from './getQueueUrl';

describe('getQueueUrl', () => {
	let subject;
	let sqsMock;

	beforeAll(() => {
		sqsMock = mockClient(SQSClient);
	});

	afterAll(() => {
		sqsMock.restore();
	});

	describe('when valid params are provided', () => {
		beforeAll(async () => {
			sqsMock.on(GetQueueUrlCommand).resolves({
				QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123456789012/DemoQueue',
			});
			subject = await getQueueUrl('DemoQueue');
		});

		it('returns QueueUrl', () => {
			expect(subject).toEqual(
				'https://sqs.us-east-1.amazonaws.com/123456789012/DemoQueue'
			);
		});
	});

	describe('when invalid params are provided', () => {
		beforeAll(() => {
			sqsMock.on(GetQueueUrlCommand).rejects('mocked rejection');
			subject = getQueueUrl('DemoQueue');
		});

		it('throws an exception with the error message', async () => {
			await expect(subject).rejects.toThrow('mocked rejection');
		});
	});
});
