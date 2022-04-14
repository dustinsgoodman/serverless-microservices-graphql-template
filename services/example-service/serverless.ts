import type { Serverless } from 'serverless/aws';
import { getCustomConfig } from '../../serverless.common';

const serviceName = 'example-service';

const serverlessConfiguration: Serverless = {
  service: serviceName,
  frameworkVersion: '3',
  plugins: [
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
    runtime: 'nodejs14.x',
    stage: "${opt:stage, 'dev'}",
    region: "${opt:region, 'us-east-1'}",
    environment: {
      REGION: '${aws:region}',
      SLS_STAGE: '${sls:stage}',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['sqs:SendMessage', 'sqs:GetQueueUrl'],
            Resource: 'arn:aws:sqs:*:*:*',
          },
        ],
      },
    },
  },
  functions: {
    hello: {
      handler: 'handlers/hello.handler',
    },
    generateDemoJobs: {
      handler: 'handlers/generateDemoJob.handler',
      events: [
        {
          httpApi: {
            method: 'get',
            path: '/generateDemoJob',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
