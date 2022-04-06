import type { Serverless } from 'serverless/aws';
import { getCustomConfig } from '../../serverless.common';

const serverlessConfiguration: Serverless = {
  service: 'example-service',
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
    environment: {
      DEMO_QUEUE_URL: '${env:DEMO_QUEUE_URL}',
    },
  },
  functions: {
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
