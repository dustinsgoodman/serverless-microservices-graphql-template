# background-jobs Service

This service will act as the background job runner for the application.

## Architecture

Because each function is packaged individually and due to the local testing of this feature relying on ElasticMQ, it is best to isolate all SQS related runtime to this service. We follow [Serverless Framework's recommendations for SQS setup](https://www.serverless.com/framework/docs/providers/aws/events/sqs) and the [serverless-offline-sqs plugin](https://www.npmjs.com/package/serverless-offline-sqs).

View local queue stats at [http://localhost:9325/](http://localhost:9325/).

## Scripts

All the following commands are run from the top-level directory of the project.

```bash
# Creates the docker container and starts it.
docker compose -f ./services/background-jobs/docker-compose.yml up -d

# Stops the docker container and deletes it.
docker compose -f ./services/background-jobs/docker-compose.yml down

# Starts the docker container. Requires the container to exist.
docker compose -f ./services/background-jobs/docker-compose.yml start

# Stops the docker container. Requires the container to exist.
docker compose -f ./services/background-jobs/docker-compose.yml stop
```
