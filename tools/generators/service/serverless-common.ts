import * as fs from 'fs';
const yaml = require('js-yaml');

type Port = {
  httpPort: number;
  lambdaPort: number;
};

type PortConfig = {
  [key: string]: Port;
};

function getNextPort(portConfig: PortConfig): number {
  if (!portConfig) {
    return 3000;
  }

  const usedPorts = Object.values(portConfig).flatMap(
    ({ httpPort, lambdaPort }) => [httpPort, lambdaPort]
  );
  return Math.max(...usedPorts) + 2;
}

function getNewPort(port: number): Port {
  return {
    httpPort: port,
    lambdaPort: port + 2,
  };
}

export const updateServerlessCommon = (serviceName: string) => {
  try {
    const doc = yaml.load(fs.readFileSync('./serverless.common.yml', 'utf8'));
    const portConfig = doc.custom.ports as PortConfig;
    const nextPort = getNextPort(portConfig);
    const newPort = getNewPort(nextPort);

    if (!portConfig) {
      doc.custom.ports = {
        [serviceName]: {
          httpPort: nextPort,
          lambdaPort: nextPort + 2,
        },
      };
    } else {
      doc.custom.ports[serviceName] = newPort;
    }

    fs.writeFileSync('./serverless.common.yml', yaml.dump(doc));
  } catch (e) {
    console.log(e);
  }
};
