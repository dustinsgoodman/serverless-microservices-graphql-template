# background-jobs Service

This service will act as the background job runner for the application.

## Architecture

Background jobs will be run using AWS SQS to queue up jobs and execute them via Lambda worker processes.

Because each function is packaged individually and due to the local testing of this feature relying on ElasticMQ, it is best to isolate all SQS related runtime to this service. We follow [Serverless Framework's recommendations for SQS setup](https://www.serverless.com/framework/docs/providers/aws/events/sqs) and the [serverless-offline-sqs plugin](https://www.npmjs.com/package/serverless-offline-sqs).

You can view local queue stats at [http://localhost:9325/](http://localhost:9325/).

When adding new queues, you must register the queue resource to a Lambda event for serverless-offline-sqs to generate the queue. Hence, you have to start this service to initialize new queues before pushing messages onto them via other queues. To add a new queue, you must do the following:

1. Register the new queue to the [Queues file](../../libs/aws/src/sqs/queues.ts)
2. Setup a new environment variable to reference the local queue and configure it in the serverless.yml
