import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';

export type QueueName = 'DemoQueue';

let cachedClient: SQSClient | null = null;

export const getClient = (): SQSClient => {
  if (cachedClient) {
    return cachedClient;
  }

  const config: SQSClientConfig = {};
  if (process.env.IS_OFFLINE === 'true') {
    config.endpoint = 'http://localhost:9324';
  }

  cachedClient = new SQSClient(config);
  return cachedClient;
};
