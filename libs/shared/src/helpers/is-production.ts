export const isProduction = (): boolean => {
  const { SLS_STAGE } = process.env;
  return SLS_STAGE === 'prod';
};
