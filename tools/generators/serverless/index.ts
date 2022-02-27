import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  joinPathFragments,
  Tree,
} from '@nrwl/devkit';
import { Schema } from './schema';
import { addJest } from './jest-config';
import { addWorkspaceConfig } from './workspace-config';

export default async (host: Tree, schema: Schema) => {
  const serviceRoot = `services/${schema.name}`;

  generateFiles(
    host, // the virtual file system
    joinPathFragments(__dirname, './files'), // path to the file templates
    serviceRoot, // destination path of the files
    { ...schema, tmpl: '' } // config object to replace variable in file templates
  );

  addWorkspaceConfig(host, schema.name, serviceRoot);

  await addJest(host, schema.name);

  await formatFiles(host);

  return () => {
    installPackagesTask(host);
  };
};
