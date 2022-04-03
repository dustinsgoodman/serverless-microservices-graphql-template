export type QueueName = 'DEMO_QUEUE';

export const QUEUES_MAP: { [q in QueueName]: string } = {
  DEMO_QUEUE: process.env.DEMO_QUEUE_URL,
};
