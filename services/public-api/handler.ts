import { APIGatewayProxyHandler } from 'aws-lambda';

export const healthcheck: APIGatewayProxyHandler = async (_event, _context) => {
  return {
    statusCode: 200,
    body: 'public-api is working!',
  };
};
