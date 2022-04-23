import {
  Tree,
  formatFiles,
  installPackagesTask,
  readProjectConfiguration,
  generateFiles,
  joinPathFragments,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { addPropertyToJestConfig } from '@nrwl/jest';

type Schema = {
  readonly name: string;
};

export default async function (tree: Tree, schema: Schema) {
  await libraryGenerator(tree, { name: schema.name });
  const libraryRoot = readProjectConfiguration(tree, schema.name).root;

  generateFiles(
    tree,
    joinPathFragments(__dirname, './files'),
    libraryRoot,
    schema
  );

  updateProject(tree, schema, libraryRoot);

  addPropertyToJestConfig(
    tree,
    `${libraryRoot}/jest.config.ts`,
    'collectCoverage',
    true
  );
  addPropertyToJestConfig(
    tree,
    `${libraryRoot}/jest.config.ts`,
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

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}

// See https://github.com/nrwl/nx/blob/efedd2eff78700a72bcc30bdf7450656860a4ffb/packages/node/src/generators/library/library.ts#L130-L156
function updateProject(tree: Tree, options: Schema, libraryRoot: string) {
  const project = readProjectConfiguration(tree, options.name);

  project.targets = project.targets || {};
  project.targets.console = {
    executor: './tools/executors/workspace:run-command',
    options: {
      cwd: libraryRoot,
      color: true,
      command:
        'node --experimental-repl-await -r ts-node/register -r tsconfig-paths/register ./console.ts',
    },
  };
  project.tags = ['lib'];

  updateProjectConfiguration(tree, options.name, project);
}
