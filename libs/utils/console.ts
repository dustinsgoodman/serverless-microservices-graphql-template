(async () => {
  const repl = await import('repl');
  let functionsMap = await import('./src');

  const replServer = repl.start({
    prompt: 'app > ',
    useColors: true,
  });

  replServer.setupHistory('./.node_repl_history', (err) => {
    if (err) {
      console.error(err);
    }
  });

  Object.entries(functionsMap).forEach(([key, value]) => {
    replServer.context[key] = value;
  });

  replServer.defineCommand('re', {
    help: 'Reload the models without resetting the environment',
    async action() {
      // bust require cache
      Object.keys(require.cache).forEach((key) => {
        delete require.cache[key];
      });

      // fetch map of functions to reload
      try {
        functionsMap = await import('./src');
      } catch (err) {
        console.error(err);
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
})();
