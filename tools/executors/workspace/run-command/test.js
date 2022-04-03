process.stdin.resume();
process.on('SIGINT', () => {
  console.log('noop on SIGINT');
});
process.on('SIGTERM', () => {
  console.log('noop on SIGTERM');
});
