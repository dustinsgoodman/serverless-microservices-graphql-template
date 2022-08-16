import {
	APIGatewayProxyEvent,
	Context as LambdaContext,
	APIGatewayProxyEventHeaders,
} from 'aws-lambda';
import { InvokeCommand } from '@aws-sdk/client-lambda';
import { TextEncoder, TextDecoder } from 'util';
import type { Service } from '@serverless-template/serverless-common';
import { downcaseKeys } from '@serverless-template/utils';
import { getClient } from './client';

export type Context = {
	event?: APIGatewayProxyEvent;
	context?: LambdaContext;
	userId?: string | number;
};

type InvokeParams = {
	serviceName: Service;
	functionName: string;
	payload?: object;
	context?: Context;
	invocationType?: 'RequestResponse' | 'Event';
};

/**
 *
 * @param {Service} serviceName - The name of the Service the function you wish to invoke belongs to, e.g. User-API
 * @param {String} functionName - The name of the Lambda function, version or alias - excluding the service name and stage. See: https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html#API_Invoke_RequestSyntax
 * @param {Object} payload - The data to be provided to the Lambda as an input - will be JSON.stringified before being passed to Lambda
 * @param {Base64} context=null - The context object to be passed from Apollo Resolver
 * @param {String} [invocationType='RequestResponse'] - The type of invocation to carry out. See: https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html#API_Invoke_RequestSyntax
 * @returns {Object} payload - The JSON data that is returned from the Lambda invocation
 */
export const invoke = async <ReturnType>({
	serviceName,
	functionName,
	payload,
	context = {},
	invocationType = 'RequestResponse',
}: InvokeParams): Promise<ReturnType | null> => {
	const combinedPayload = {
		...context.event,
		body: JSON.stringify(payload),
	};

	// forcing all headers for case insensitivity
	if (combinedPayload.headers) {
		combinedPayload.headers = downcaseKeys(
			combinedPayload.headers
		) as APIGatewayProxyEventHeaders;
	}

	const combinedContext = {
		...context.context,
		// insert other key context to pass along like userId
		// userId: context.userId,
	};

	const stringifiedContext = JSON.stringify(combinedContext);
	const processedContext = Buffer.from(stringifiedContext).toString('base64');
	const params = {
		ClientContext: processedContext,
		FunctionName: `${serviceName}-${process.env.SLS_STAGE}-${functionName}`,
		InvocationType: invocationType,
		Payload: new TextEncoder().encode(JSON.stringify(combinedPayload)),
		LogType: 'Tail',
	};

	const command = new InvokeCommand(params);
	const { Payload, FunctionError } = await getClient(serviceName).send(command);

	if (FunctionError) {
		throw new Error(FunctionError);
	}

	if (Payload) {
		return JSON.parse(new TextDecoder().decode(Payload));
	}

	return null;
};
