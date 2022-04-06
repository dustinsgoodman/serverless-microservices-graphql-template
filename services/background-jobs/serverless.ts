import type { Serverless } from 'serverless/aws';
import { getCustomConfig } from '../../serverless.common';

const serverlessConfiguration: Serverless = {
  service: 'background-jobs',
  frameworkVersion: '3',
  plugins: [
    'serverless-s3-remover',
    'serverless-esbuild',
    'serverless-analyze-bundle-plugin',
    'serverless-offline-sqs',
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
