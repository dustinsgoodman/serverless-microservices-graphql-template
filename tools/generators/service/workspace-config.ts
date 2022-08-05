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
      deploy: {
        ...buildRunCommandConfig(
          serviceRoot,
          'sls deploy --stage {args.stage}'
        ),
      },
      remove: {
        ...buildRunCommandConfig(
          serviceRoot,
          'sls remove --stage {args.stage}'
        ),
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
