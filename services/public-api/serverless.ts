import type { Serverless } from 'serverless/aws';
import { getCustomConfig } from '../../serverless.common';

const serverlessConfiguration: Serverless = {
  service: 'public-api',
  frameworkVersion: '3',
  plugins: [
    'serverless-s3-remover',
    'serverless-esbuild',
    'serverless-analyze-bundle-plugin',
    'serverless-offline',
  ],
  useDotenv: true,
  custom: function () {
    return getCustomConfig(this.service);
  },
  package: {
    individually: true,
    patterns: ['handler.js', '!node_modules/**'],
    excludeDevDependencies: true,
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: "${opt:stage, 'dev'}",
    region: "${opt:region, 'us-east-1'}",
    httpApi: {
      // TODO: update to be more restrictive for real apps: https://www.serverless.com/framework/docs/providers/aws/events/http-api/#cors-setup
      cors: true,
    },
    tracing: {
      apiGateway: true,
      lambda: true,
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['lambda:InvokeFunction'],
            Resource: '*',
          },
        ],
      },
    },
  },
  functions: {
    graphql: {
      handler: 'src/handlers/graphql.server',
      events: [
        {
          httpApi: {
            method: 'post',
            path: '/graphql',
          },
        },
        {
          httpApi: {
            method: 'get',
            path: '/graphql',
          },
        },
      ],
    },
    healthcheck: {
      handler: 'src/handlers/healthcheck.handler',
      events: [
        {
          httpApi: {
            path: '/healthcheck',
            method: 'get',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
