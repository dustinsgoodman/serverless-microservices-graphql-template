import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { handler } from './hello';

describe('healtcheck', () => {
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
