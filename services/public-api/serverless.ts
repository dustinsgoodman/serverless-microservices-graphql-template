import type { Serverless } from 'serverless/aws';
import { getCustomConfig } from '../../serverless.common';

const serviceName = 'public-api';

const serverlessConfiguration: Serverless = {
  service: serviceName,
  frameworkVersion: '3',
  plugins: [
    // 'serverless-domain-manager',
    'serverless-esbuild',
    'serverless-analyze-bundle-plugin',
    'serverless-offline',
  ],
  useDotenv: true,
  custom: getCustomConfig(serviceName),
  package: {
    individually: true,
    patterns: ['handler.js', '!node_modules/**'],
    excludeDevDependencies: true,
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    // profile: '<your profile>',
    stage: "${opt:stage, 'dev'}",
    region: "${opt:region, 'us-east-1'}",
    memorySize: 512, // default: 1024MB
    timeout: 29, // default: max allowable for Gateway
    httpApi: {
      // TODO: update to be more restrictive for real apps: https://www.serverless.com/framework/docs/providers/aws/events/http-api/#cors-setup
      cors: true,
    },
    environment: {
      REGION: '${aws:region}',
      SLS_STAGE: '${sls:stage}',
    },

    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['lambda:InvokeFunction'],
            Resource: 'arn:aws:lambda:*:*:*',
          },
        ],
      },
    },
    tracing: {
      apiGateway: true,
      lambda: true,
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
