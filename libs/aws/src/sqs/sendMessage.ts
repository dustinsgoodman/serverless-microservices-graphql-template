import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { getClient } from './client';
import type { QueueName } from './client';
import { getQueueUrl } from './getQueueUrl';

type Message = {
	[key: string]: string | number | boolean | null;
};

export const sendMessage = async (queue: QueueName, message: Message) => {
	const client = getClient();
	const queueUrl = await getQueueUrl(queue);
	const command = new SendMessageCommand({
		QueueUrl: queueUrl,
		MessageBody: JSON.stringify(message),
	});

	try {
		const data = await client.send(command);
		return {
			success: true,
			data,
		};
	} catch (error) {
		return {
			success: false,
			data: error.message,
		};
	}
};
