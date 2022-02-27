import { server } from './graphql';

describe('apollo server', () => {
  test('returns graphql server handler', () => {
    expect(server).toBeInstanceOf(Function);
  });
});
