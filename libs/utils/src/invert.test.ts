import { invert } from './invert';

describe('.invert', () => {
	let subject;

	describe('when object is simple', () => {
		beforeAll(() => {
			subject = invert({ a: 1, b: 2 });
		});

		test('returns inverted object', async () => {
			expect(subject).toEqual({ 1: 'a', 2: 'b' });
		});
	});

	describe('when object has duplicating values', () => {
		beforeAll(() => {
			subject = invert({ a: 1, b: 2, c: 2 });
		});

		test('returns inverted object keeping last match', async () => {
			expect(subject).toEqual({ 1: 'a', 2: 'c' });
		});
	});

	describe('when object has complex values', () => {
		beforeAll(() => {
			subject = invert({ a: 1, b: [2, 3], c: { d: 4, e: 5 } });
		});

		test('returns the values as toStringed keys', async () => {
			expect(subject).toEqual({ '1': 'a', '2,3': 'b', '[object Object]': 'c' });
		});
	});
});
