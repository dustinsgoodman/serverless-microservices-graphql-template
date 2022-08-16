import { handler } from './hello';

describe('hello', () => {
	let subject;

	beforeAll(async () => {
		subject = await handler({
			body: JSON.stringify({ greeting: 'world' }),
		});
	});

	it('returns a greeting message', () => {
		expect(subject).toEqual('Hello, world');
	});
});
