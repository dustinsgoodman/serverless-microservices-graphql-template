import { LambdaClient } from '@aws-sdk/client-lambda';
// import { Lambda } from 'aws-sdk';

export const getLambdaClient = (port: number) => {
  const { IS_OFFLINE, region } = process.env;

  const invokeUrl =
    IS_OFFLINE === 'true'
      ? `http://localhost:${port}`
      : `https://lambda.${process.env.REGION}.amazonaws.com`;

  return new LambdaClient({
    apiVersion: '2031',
    region: region,
    endpoint: invokeUrl,
  });
};
