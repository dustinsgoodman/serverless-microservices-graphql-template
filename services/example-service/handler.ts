import { SQS } from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const healthcheck: APIGatewayProxyHandler = async (_event, _context) => {
  return {
    statusCode: 200,
    body: 'example-service is working!',
  };
};

export const generateDemoJobs: APIGatewayProxyHandler = async () => {
  const sqs = new SQS({ apiVersion: '2012-11-05' });
  const resp = await sqs
    .sendMessage({
      // TODO: refactor to use environment variables
      QueueUrl: 'http://localhost:9324/000000000000/DemoQueue',
      MessageBody: 'Hello World!',
    })
    .promise();

  if (resp.MessageId) {
    return {
      statusCode: 200,
      body: JSON.stringify(resp),
    };
  }

  console.error(resp);
  return {
    statusCode: 400,
    body: 'Could not send message',
  };
};
