import { mockClient } from 'aws-sdk-client-mock';
import { TextEncoder } from 'util';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { Context, invoke } from './invoke';

describe('.invoke', () => {
  let subject;
  let invokeMock;
  let payload;

  beforeAll(() => {
    invokeMock = mockClient(LambdaClient);
  });

  afterAll(() => {
    invokeMock.restore();
  });

  describe('when context not provided', () => {
    beforeAll(async () => {
      payload = new TextEncoder().encode(
        JSON.stringify({
          body: JSON.stringify({ a: 1, b: 2 }),
        })
      );
      invokeMock
        .on(InvokeCommand, {
          ClientContext: 'e30=',
          FunctionName: 'public-api-dev-testFn',
          InvocationType: 'RequestResponse',
          Payload: payload,
          LogType: 'Tail',
        })
        .resolves({
          Payload: new TextEncoder().encode(
            JSON.stringify({
              code: 'OK',
              message: 'test successful',
              statusCode: 200,
            })
          ),
        });

      subject = await invoke({
        serviceName: 'public-api',
        functionName: 'testFn',
        payload: { a: 1, b: 2 },
      });
    });

    it('returns response from lambda', () => {
      expect(subject).toEqual({
        code: 'OK',
        message: 'test successful',
        statusCode: 200,
      });
    });
  });

  describe('when context provided', () => {
    beforeAll(async () => {
      payload = new TextEncoder().encode(
        JSON.stringify({
          headers: {
            authorization: 'Bearer test',
          },
          body: JSON.stringify({ a: 1, b: 2 }),
        })
      );
      invokeMock
        .on(InvokeCommand, {
          ClientContext: 'e30=',
          FunctionName: 'public-api-dev-testFn',
          InvocationType: 'RequestResponse',
          Payload: payload,
          LogType: 'Tail',
        })
        .resolves({
          Payload: new TextEncoder().encode(
            JSON.stringify({
              code: 'OK',
              message: 'test successful',
              statusCode: 200,
            })
          ),
        });

      subject = await invoke({
        serviceName: 'public-api',
        functionName: 'testFn',
        payload: { a: 1, b: 2 },
        context: {
          event: {
            headers: {
              Authorization: 'Bearer test',
            },
          },
        } as unknown as Context,
      });
    });

    it('returns response from lambda', () => {
      expect(subject).toEqual({
        code: 'OK',
        message: 'test successful',
        statusCode: 200,
      });
    });
  });
});
