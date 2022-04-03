import { mockClient } from 'aws-sdk-client-mock';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { sendMessage } from './sendMessage';

describe('sendMessage', () => {
  let subject;
  let sqsMock;

  beforeAll(() => {
    sqsMock = mockClient(SQSClient);
  });

  afterAll(() => {
    sqsMock.restore();
  });

  describe('when valid params are provided', () => {
    let messageId;

    beforeAll(async () => {
      messageId = '12345678-1111-2222-3333-111122223333';
      sqsMock.on(SendMessageCommand).resolves({
        MessageId: messageId,
      });
      subject = await sendMessage('DEMO_QUEUE', {
        message: 'Hello World',
      });
    });

    it('sends message to queue', () => {
      expect(subject).toEqual({
        success: true,
        data: {
          MessageId: messageId,
        },
      });
    });
  });

  describe('when invalid params are provided', () => {
    beforeAll(async () => {
      sqsMock.rejects('mocked rejection');
      subject = await sendMessage('DEMO_QUEUE', {
        message: 'Hello World',
      });
    });

    it('does not send the message to queue', () => {
      expect(subject).toEqual({
        success: false,
        data: new Error('mocked rejection'),
      });
    });
  });
});
