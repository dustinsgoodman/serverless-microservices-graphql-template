const repl = require('repl');
let functionsMap = {};

try {
  functionsMap = require('./src');
} catch (err) {
  console.log(
    'No src/index found. Using default node repl without any context injected.'
  );
}

const replServer = repl.start({
  prompt: 'app > ',
  useColors: true,
});

replServer.setupHistory('./.node_repl_history', (err) => {
  console.error(err);
});

Object.entries(functionsMap).forEach(([key, value]) => {
  replServer.context[key] = value;
});

replServer.defineCommand('re', {
  help: 'Reload the models without resetting the environment',
  action() {
    // bust require cache
    Object.keys(require.cache).forEach((key) => {
      delete require.cache[key];
    });

    // fetch map of functions to reload
    try {
      functionsMap = require('./src');
    } catch (err) {
      console.log(
        'No src/index found. Using default node repl without any context injected.'
      );
    }
    Object.entries(functionsMap).forEach(([key, value]) => {
      replServer.context[key] = value;
    });

    // inform user that reload is complete
    console.log('reloaded!');

    // reset the prompt
    this.displayPrompt();
  },
});
