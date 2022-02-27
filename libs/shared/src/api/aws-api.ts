import { config, SharedIniFileCredentials, Lambda } from 'aws-sdk';

const { IS_OFFLINE } = process.env;
if (IS_OFFLINE === 'true') {
  const credentials = new SharedIniFileCredentials({});
  config.update({
    credentials,
  });
}

export { Lambda };
