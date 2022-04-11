import type { Serverless } from 'serverless/aws';

export type Service = 'public-api' | 'background-jobs' | 'example-service';
export type Port = {
  httpPort: number;
  lambdaPort: number;
};
type PortConfig = {
  [k in Service]: Port;
};

export const PORTS: PortConfig = {
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
};

export const getCustomConfig = (
  serviceName: Service
): Serverless['custom'] => ({
  'serverless-offline': {
    httpPort: PORTS[serviceName].httpPort,
    lambdaPort: PORTS[serviceName].lambdaPort,
  },
  esbuild: {
    packager: 'yarn',
    plugins: '../../esbuild-plugins.js',
    bundle: true,
    minify: true,
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
});
