import { GraphQLRequest } from 'apollo-server-types';
import { DocumentNode } from 'graphql';
import { apolloServer } from '../handlers/graphql';
import { LambdaContextFunctionParams } from 'apollo-server-lambda/dist/ApolloServer';

const defaultContextParams: LambdaContextFunctionParams = {
  event: { headers: {}, random: '123' },
  context: {},
  express: undefined,
};

export const apolloServerExecute = (
  request: Omit<GraphQLRequest, 'query'> & {
    query?: string | DocumentNode;
  },
  contextParams: LambdaContextFunctionParams = defaultContextParams
) => {
  return apolloServer.executeOperation(
    request,
    Object.assign(defaultContextParams, contextParams)
  );
};
