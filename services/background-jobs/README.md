# background-jobs Service

This service will act as the background job runner for the application.

## Architecture

Because each function is packaged individually and due to the local testing of this feature relying on ElasticMQ, it is best to isolate all SQS related runtime to this service. We follow [Serverless Framework's recommendations for SQS setup](https://www.serverless.com/framework/docs/providers/aws/events/sqs) and the [serverless-offline-sqs plugin](https://www.npmjs.com/package/serverless-offline-sqs).

## Scripts

Note how to invoke this service with the needed docker command to get ElasticMQ running alongside the service.
