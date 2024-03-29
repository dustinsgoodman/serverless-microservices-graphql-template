import { LambdaClient, LambdaClientConfig } from '@aws-sdk/client-lambda';
import type { Port, Service } from '@serverless-template/serverless-common';
import { PORTS } from '@serverless-template/serverless-common';
import { isOffline } from '@serverless-template/utils';

let cachedClient: LambdaClient | null = null;

export const getClient = (serviceName: Service) => {
	if (cachedClient) {
		return cachedClient;
	}

	const { REGION } = process.env;

	const config: LambdaClientConfig = {
		apiVersion: '2031',
		region: REGION,
	};

	if (isOffline()) {
		const port = (PORTS[serviceName] as Port).lambdaPort;
		config.endpoint = `http://localhost:${port}`;
	}

	cachedClient = new LambdaClient(config);
	return cachedClient;
};
