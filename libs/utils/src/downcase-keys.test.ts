import { downcaseKeys } from './downcase-keys';

describe('.downcaseKeys', () => {
	let subject;

	describe('when object has mixed case keys', () => {
		beforeAll(() => {
			subject = downcaseKeys({
				bar: 'bar',
				bAz: 'baz',
				FOO: 'foo',
				fooBar: 'foobar',
				foo_bar: 'foobar',
				FooBar: 'foobar',
				_foo_BAR_: 'foobar',
			});
		});

		test('returns all keys downcased', () => {
			expect(subject).toEqual({
				bar: 'bar',
				baz: 'baz',
				foo: 'foo',
				foobar: 'foobar',
				foo_bar: 'foobar',
				_foo_bar_: 'foobar',
			});
		});
	});
});
