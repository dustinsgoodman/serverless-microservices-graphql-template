import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';
import { isOffline } from '@serverless-template/utils';

export type QueueName = 'DemoQueue';

let cachedClient: SQSClient | null = null;

export const getClient = (): SQSClient => {
  if (cachedClient) {
    return cachedClient;
  }

  const config: SQSClientConfig = {};
  if (isOffline()) {
    config.endpoint = 'http://localhost:9324';
  }

  cachedClient = new SQSClient(config);
  return cachedClient;
};
