import { GetQueueUrlCommand } from '@aws-sdk/client-sqs';
import { getClient } from './client';
import type { QueueName } from './client';

export const getQueueUrl = async (queue: QueueName): Promise<string> => {
  const command = new GetQueueUrlCommand({
    QueueName: queue,
  });
  const { QueueUrl } = await getClient().send(command);

  return QueueUrl;
};
