import { ApolloServer } from 'apollo-server-lambda';
import {
  Context,
  APIGatewayProxyEventHeaders,
  APIGatewayProxyEvent,
} from 'aws-lambda';
import { typeDefs, resolvers } from '../schema';

export type ApolloServerContext = {
  headers: APIGatewayProxyEventHeaders;
  functionName: string;
  event: APIGatewayProxyEvent;
  context: Context;
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({}),
  context: {},
});

export const server = apolloServer.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: true,
      credentials: true,
    },
  },
});
