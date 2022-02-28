import { gql } from 'apollo-server-lambda';
import { apolloServer } from '../../handlers/graphql';

describe('hello query', () => {
  let subject;
  let greeting: string;

  beforeAll(async () => {
    greeting = 'World!';
    const QUERY = gql`
      query HelloWorldQuery {
        hello (greeting: "${greeting}")
      }
    `;
    subject = await apolloServer.executeOperation({ query: QUERY });
  });

  it('returns the salutation concatenated with the greeting', () => {
    expect(subject.data).toEqual({
      hello: `Hello ${greeting}`,
    });
  });
});
