import type { Serverless } from 'serverless/aws';
import { getCustomConfig } from '../../serverless.common';

const serviceName = 'background-jobs';

const serverlessConfiguration: Serverless = {
  service: serviceName,
  frameworkVersion: '3',
  plugins: [
    'serverless-s3-remover',
    'serverless-esbuild',
    'serverless-analyze-bundle-plugin',
    'serverless-offline-sqs',
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
            Action: ['sqs:CreateQueue'],
            Resource: 'arn:aws:sqs:*:*:*',
          },
        ],
      },
    },
  },
  functions: {
    demo: {
      handler: 'handlers/demo.handler',
      events: [
        {
          sqs: {
            arn: {
              'Fn::GetAtt': ['DemoQueue', 'Arn'],
            },
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      DemoQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'DemoQueue',
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
