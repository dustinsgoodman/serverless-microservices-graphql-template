import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { sendMessage } from '@serverless-template/aws';
import { handler } from './generateDemoJob';

jest.mock('@serverless-template/aws');

describe('generateDemoJob', () => {
	let subject;
	let mathRandomMock;

	const sendMessageMock = jest.mocked(sendMessage, true);

	beforeAll(() => {
		mathRandomMock = jest.spyOn(global.Math, 'random').mockReturnValue(0.11);
	});

	afterAll(() => {
		mathRandomMock.mockRestore();
		jest.clearAllMocks();
	});

	describe('when the message is sent sucessfully', () => {
		beforeAll(async () => {
			sendMessageMock.mockResolvedValue({
				success: true,
				data: {
					MessageId: '123456789',
				},
			});
			subject = await handler(
				{} as APIGatewayProxyEvent,
				{} as Context,
				{} as Callback
			);
		});

		afterAll(() => {
			sendMessageMock.mockClear();
		});

		it('returns a 200 status code', () => {
			expect(subject.statusCode).toBe(200);
		});

		it('returns the returned messaged', () => {
			expect(JSON.parse(subject.body)).toEqual({
				MessageId: '123456789',
			});
		});
	});

	describe('when the message is not sent sucessfully', () => {
		beforeAll(async () => {
			sendMessageMock.mockResolvedValue({
				success: false,
				data: 'bad request',
			});
			subject = await handler(
				{} as APIGatewayProxyEvent,
				{} as Context,
				{} as Callback
			);
		});

		afterAll(() => {
			sendMessageMock.mockClear();
		});

		it('returns a 400 status code', () => {
			expect(subject.statusCode).toBe(400);
		});

		it('returns the returned messaged', () => {
			expect(JSON.parse(subject.body)).toEqual('bad request');
		});
	});
});
