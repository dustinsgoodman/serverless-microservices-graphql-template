import { Tree } from '@nrwl/devkit';
import { jestProjectGenerator, addPropertyToJestConfig } from '@nrwl/jest';
import { JestProjectSchema } from '@nrwl/jest/src/generators/jest-project/schema';

export const addJest = async (
  host: Tree,
  projectName: string,
  serviceRoot: string
) => {
  await jestProjectGenerator(host, <JestProjectSchema>{
    project: projectName,
    setupFile: 'none',
    testEnvironment: 'node',
    skipSerializers: false,
    skipSetupFile: false,
    supportTsx: false,
    babelJest: false,
    skipFormat: true,
  });

  addPropertyToJestConfig(
    host,
    `${serviceRoot}/jest.config.ts`,
    'collectCoverage',
    true
  );
  addPropertyToJestConfig(
    host,
    `${serviceRoot}/jest.config.ts`,
    'coverageThreshold',
    {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    }
  );
};
