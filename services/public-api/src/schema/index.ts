import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { helloTypeDefs, helloResolvers } from './hello';

const typeDefs = mergeTypeDefs([helloTypeDefs]);

const resolvers = mergeResolvers([helloResolvers]);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
