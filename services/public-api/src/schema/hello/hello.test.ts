import { gql } from 'apollo-server-lambda';
import { invoke } from '@serverless-template/aws';
import { apolloServer } from '../../handlers/graphql';

jest.mock('@serverless-template/aws');

describe('hello query', () => {
  let subject;
  let greeting: string;

  const invokeMock = jest.mocked(invoke, true);

  beforeAll(async () => {
    greeting = 'World!';
    const QUERY = gql`
      query HelloWorldQuery {
        hello (greeting: "${greeting}")
      }
    `;
    invokeMock.mockResolvedValue('Hello, World!');
    subject = await apolloServer.executeOperation({ query: QUERY });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('calls the example-service hello function', () => {
    expect(invokeMock).toHaveBeenCalledWith({
      serviceName: 'example-service',
      functionName: 'hello',
      payload: { greeting },
      context: expect.any(Object),
    });
  });

  it('returns the salutation concatenated with the greeting', () => {
    expect(subject.data).toEqual({
      hello: `Hello, ${greeting}`,
    });
  });
});
