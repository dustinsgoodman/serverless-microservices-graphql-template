import type { Serverless } from 'serverless/aws';

export const custom: Serverless['custom'] = {
  ports: {
    'public-api': {
      httpPort: 3000,
      lambdaPort: 3002,
    },
    'background-jobs': {
      httpPort: 3004,
      lambdaPort: 3006,
    },
    'example-service': {
      httpPort: 3008,
      lambdaPort: 3010,
    },
  },
  'serverless-offline': {
    httpPort: '${self:custom.ports.${self:service}.httpPort}',
    lambdaPort: '${self:custom.ports.${self:service}.lambdaPort}',
  },
  esbuild: {
    packager: 'yarn',
    plugins: '../../esbuild-plugins.js',
  },
  'serverless-offline-sqs': {
    autoCreate: true,
    apiVersion: '2012-11-05',
    endpoint: 'http://0.0.0.0:9324',
    region: 'us-east-1',
    accessKeyId: 'root',
    secretAccessKey: 'root',
    skipCacheInvalidation: false,
  },
};
