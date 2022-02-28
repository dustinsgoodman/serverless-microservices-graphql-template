import { Resolvers } from '../../types/graphql';

export const helloResolvers: Resolvers = {
  Query: {
    hello: async (_parent, { greeting }): Promise<string> =>
      `Hello ${greeting}`,
  },
};
