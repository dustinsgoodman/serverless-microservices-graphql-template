import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { QueueName, QUEUES_MAP } from './queues';

type Message = {
  [key: string]: string | number | boolean | null;
};

export const sendMessage = async (queue: QueueName, message: Message) => {
  const queueUrl = QUEUES_MAP[queue];
  const client = new SQSClient({
    endpoint: queueUrl,
  });
  const command = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(message),
  });

  try {
    const data = await client.send(command);
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      data: error.message,
    };
  }
};
