import { ApolloServer } from 'apollo-server-lambda';
import {
  Context,
  APIGatewayProxyEventHeaders,
  APIGatewayProxyEvent,
} from 'aws-lambda';
import { schema } from '../schema';

export type ApolloServerContext = {
  headers: APIGatewayProxyEventHeaders;
  functionName: string;
  event: APIGatewayProxyEvent;
  context: Context;
};

// export for use in tests
export const apolloServer = new ApolloServer({
  schema,
  dataSources: () => ({}),
  context: async ({ event, context }: ApolloServerContext) => ({
    headers: event.headers,
    functionName: context.functionName,
    event: event,
    context: context,
  }),
  cache: 'bounded',
});

export const server = apolloServer.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: true,
      credentials: true,
    },
  },
});
