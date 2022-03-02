const fs = require('fs');
const path = require('path');
const repl = require('repl');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (file === 'index.ts' || file.includes('test.ts')) {
      return;
    }

    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, '/', file));
    }
  });

  return arrayOfFiles;
}

const loadFunctions = (context) => {
  Object.keys(require.cache).forEach((key) => {
    delete require.cache[key];
  });

  const allFilePaths = getAllFiles('./src');
  allFilePaths.forEach((filePath) => {
    const fileName = filePath.split('/').pop().slice(0, -3);
    context[fileName] = require(filePath);
  });
};

const replServer = repl.start('app > ');
replServer.setupHistory('./.node_repl_history', (err) => {
  console.error(err);
});
loadFunctions(replServer.context);

replServer.defineCommand('re', {
  help: 'Reload the models without resetting the environment',
  action() {
    loadFunctions(replServer.context);
    console.log('reloaded!');
    this.displayPrompt();
  },
});
