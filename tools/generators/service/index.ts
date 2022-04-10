import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  joinPathFragments,
  Tree,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { Schema } from './schema';
import { addJest } from './jest-config';
import { addWorkspaceConfig } from './workspace-config';
import { updateServerlessCommon } from './serverless-common';

export default async (host: Tree, schema: Schema) => {
  const serviceRoot = `services/${schema.name}`;

  updateServerlessCommon(schema.name);

  generateFiles(
    host, // the virtual file system
    joinPathFragments(__dirname, './files'), // path to the file templates
    serviceRoot, // destination path of the files
    { ...schema, tmpl: '' } // config object to replace variable in file templates
  );

  addWorkspaceConfig(host, schema.name, serviceRoot);

  await addJest(host, schema.name, serviceRoot);

  updateProject(host, schema, serviceRoot);

  await formatFiles(host);

  return () => {
    installPackagesTask(host);
  };
};

// See https://github.com/nrwl/nx/blob/efedd2eff78700a72bcc30bdf7450656860a4ffb/packages/node/src/generators/library/library.ts#L130-L156
function updateProject(tree: Tree, options: Schema, serviceRoot: string) {
  const project = readProjectConfiguration(tree, options.name);

  project.targets = project.targets || {};
  delete project.targets.deploy;

  project.targets['deploy-dev'] = {
    executor: './tools/executors/workspace:run-command',
    options: {
      cwd: serviceRoot,
      color: true,
      command: 'sls deploy --stage dev',
    },
  };
  project.targets['deploy-stage'] = {
    executor: './tools/executors/workspace:run-command',
    options: {
      cwd: serviceRoot,
      color: true,
      command: 'sls deploy --stage stage',
    },
  };
  project.targets['deploy-prod'] = {
    executor: './tools/executors/workspace:run-command',
    options: {
      cwd: serviceRoot,
      color: true,
      command: 'sls deploy --stage prod',
    },
  };
  project.tags = ['service'];

  updateProjectConfiguration(tree, options.name, project);
}
