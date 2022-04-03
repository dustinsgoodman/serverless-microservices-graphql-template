import { APIGatewayProxyHandler } from 'aws-lambda';
import { sendMessage } from '@serverless-template/aws';

export const handler: APIGatewayProxyHandler = async () => {
  const resp = await sendMessage('DEMO_QUEUE', {
    id: Math.ceil(Math.random() * 100),
    message: 'Hello World!',
  });

  return {
    statusCode: resp.success ? 200 : 400,
    body: JSON.stringify(resp.data),
  };
};
