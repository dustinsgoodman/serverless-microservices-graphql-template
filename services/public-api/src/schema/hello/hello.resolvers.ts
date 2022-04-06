import { Resolvers } from '../../types/graphql';
import { invoke } from '@serverless-template/aws';

export const helloResolvers: Resolvers = {
  Query: {
    hello: async (_parent, { greeting }, context): Promise<string> => {
      const resp = await invoke<string>({
        serviceName: 'example-service',
        functionName: 'hello',
        payload: { greeting },
        context,
      });
      return resp || 'generic hello';
    },
  },
};
