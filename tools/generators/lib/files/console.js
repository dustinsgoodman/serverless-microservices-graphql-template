// const fs = require('fs');
const path = require('path');
const repl = require('repl');
const shared = require(path.join(__dirname, 'src'));

const loadFunctions = (context) => {
  Object.keys(require.cache).forEach((key) => {
    delete require.cache[key];
  });

  Object.entries(shared).forEach(([key, value]) => {
    context[key] = value;
  });

  // fs.readdirSync(modelDir, 'utf8').forEach((name) => {
  //   const filePath = path.join(modelDir, name);
  //   context[name.slice(0, -3)] = require(filePath);
  // });
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
