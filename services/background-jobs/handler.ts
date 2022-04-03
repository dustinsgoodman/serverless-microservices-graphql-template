import { SQS } from 'aws-sdk';
import { APIGatewayProxyHandler, SQSHandler } from 'aws-lambda';

export const healthcheck: APIGatewayProxyHandler = async (_event, _context) => {
  const sqs = new SQS({ apiVersion: '2012-11-05' });
  console.log(_context);
  sqs.sendMessage(
    {
      QueueUrl: 'http://localhost:9324/000000000000/TestQueue',
      MessageBody: 'Hello World!',
    },
    (err, data) => {
      // if (err) console.log(err, err.stack);
      // // an error occurred
      // else console.log(data); // successful response
    }
  );

  return {
    statusCode: 200,
    body: 'background-jobs is working!',
  };
};

export const process: SQSHandler = async (event) => {
  const recordHandler = async (record) => {
    console.log(JSON.stringify(record.body));
  };

  await Promise.all(event.Records.map(recordHandler));
};
