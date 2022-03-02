import {
  Tree,
  formatFiles,
  installPackagesTask,
  readProjectConfiguration,
  generateFiles,
  joinPathFragments,
  getWorkspaceLayout,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

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

  updateProject(tree, schema);

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}

// See https://github.com/nrwl/nx/blob/efedd2eff78700a72bcc30bdf7450656860a4ffb/packages/node/src/generators/library/library.ts#L130-L156
function updateProject(tree: Tree, options: Schema) {
  const project = readProjectConfiguration(tree, options.name);

  project.targets = project.targets || {};
  project.targets.console = {
    executor: './tools/executors/workspace:run-command',
    options: {
      cwd: 'libs/shared',
      color: true,
      command:
        'node --experimental-repl-await -r ts-node/register ./console.js',
    },
  };

  updateProjectConfiguration(tree, options.name, project);
}
