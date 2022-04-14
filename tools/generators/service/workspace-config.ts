import { addProjectConfiguration, Tree } from '@nrwl/devkit';

const buildRunCommandConfig = (dir: string, command: string) => ({
  executor: './tools/executors/workspace:run-command',
  options: {
    cwd: dir,
    color: true,
    command: command,
  },
});

export const addWorkspaceConfig = (
  host: Tree,
  projectName: string,
  serviceRoot: string
) => {
  addProjectConfiguration(host, projectName, {
    root: serviceRoot,
    projectType: 'application',
    sourceRoot: serviceRoot + '/src',
    targets: {
      build: {
        ...buildRunCommandConfig(serviceRoot, 'sls package'),
      },
      serve: {
        ...buildRunCommandConfig(serviceRoot, 'sls offline start'),
      },
      'deploy-dev': {
        ...buildRunCommandConfig(serviceRoot, 'sls deploy --stage dev'),
      },
      'deploy-stage': {
        ...buildRunCommandConfig(serviceRoot, 'sls deploy --stage stage'),
      },
      'deploy-prod': {
        ...buildRunCommandConfig(serviceRoot, 'sls deploy --stage prod'),
      },
      'remove-dev': {
        ...buildRunCommandConfig(serviceRoot, 'sls remove --stage dev'),
      },
      'remove-stage': {
        ...buildRunCommandConfig(serviceRoot, 'sls remove --stage stage'),
      },
      'remove-prod': {
        ...buildRunCommandConfig(serviceRoot, 'sls remove --stage prod'),
      },
      analyze: {
        ...buildRunCommandConfig(
          serviceRoot,
          'sls package --analyze {args.function}'
        ),
      },
      lint: {
        executor: '@nrwl/linter:eslint',
        options: {
          lintFilePatterns: [serviceRoot + '/**/*.ts'],
        },
      },
    },
    tags: ['service'],
  });
};
