// const fs = require('fs');
// const path = require('path');
const repl = require('repl');

console.log(__dirname``);
// const modelDir = path.join(__dirname, 'src', 'models');

// const loadModels = (context) => {
//   Object.keys(require.cache).forEach((key) => {
//     delete require.cache[key];
//   });
//   fs.readdirSync(modelDir, 'utf8').forEach((name) => {
//     const filePath = path.join(modelDir, name);
//     context[name.slice(0, -3)] = require(filePath);
//   });
// };

const replServer = repl.start('app >');
replServer.setupHistory('./.node_repl_history', (err) => {
  console.error(err);
});
// loadModels(replServer.context);

replServer.defineCommand('re', {
  help: 'Reload the models without resetting the environment',
  action() {
    // loadModels(replServer.context);
    this.displayPrompt();
  },
});
