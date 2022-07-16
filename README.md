# Serverless Micoservices w/ GraphQL Template

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![](https://img.shields.io/badge/monorepo-Nx-blue)](https://nx.dev/)
![npm peer dependency version (scoped)](https://img.shields.io/npm/dependency-version/eslint-config-prettier/peer/eslint)
![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/sudokar/nx-serverless/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/dustinsgodman/serverless-template)

A template for a Serverless Framework microservices architecture based on the [nx-serverless-template by sudokar](https://github.com/sudokar/nx-serverless).

## Table of contents

- [Whats Included](#whats-included)
- [Template Layout](#template-layout)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Further help](#further-help)
- [Contribution](#contribution)
- [Support](#support)
- [Maintainer](#maintainer)
- [License](#license)

## Whats Included

- A template project layout using latest version of Nx and Servrless Framework
- An easy to use workspace generator to generate a template/service with Serverless Framework files and related Nx configuration
- Configured with a basic AWS provider that can be easily adopted to any cloud provider
- Serverless Offline microservices architecture support

### How does this differ from the original template?

The original template is phenomenal, but I was aiming for some additional customizations and different core libraries. Specifically:

- This version uses esbuild instead of webpack
- This version provides some common utility functions for a microservices architecture
- Upstream used Nx Cloud and some other 3rd party tools where this version uses just GitHub Actions
- This version provides opinionated public-api and background-jobs services for consumption.

## Template Layout

```shell
.
├── services/    # each serverless configuration/template and its associated files
├── libs/      # shared libraries
├── tools/
├── README.md
├── jest.config.ts
├── jest.preset.ts
├── nx.json
├── package.json
├── serverless.common.yml  # shared serverless configuration
├── tsconfig.base.json
├── workspace.json
├── .editorconfig
├── .eslintrc.json
├── .gitignore
├── .husky              # git hooks
├── .nvmrc
├── .prettierignore
├── .prettierrc
├── docker-compose.yml
```

## Prerequisites

- [Node.js 16](https://nodejs.org/) - [nvm](https://github.com/nvm-sh/nvm) recommended
- [Yarn](https://yarnpkg.com)
- [Serverless Framework v3](https://serverless.com/)
- 💅 Code format plugins
  - [Eslint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - [EditorConfig](https://editorconfig.org/)
- Jest for testing

## Usage

**Install project dependencies**

```shell
yarn
```

**Setup and run infrastructure**

All needed services, such as databases, are managed via Docker. When working in this project, it is
recommended that you start all the infrastructure. When you're not working on the project, you should
stop all the infrastructure.

```shell
# Creates the docker container and starts it.
yarn infrastructure:setup

# Stops the docker container and deletes it.
yarn infrastructure:teardown

# Starts the docker container. Requires the container to exist.
yarn infrastructure:start

# Stops the docker container. Requires the container to exist.
yarn infrastructure:stop
```

**Generate a new service**

```shell
yarn workspace-generator service <SERVICE_NAME>
```

**Generate a new library**

```shell
yarn workspace-generator lib <LIBRARY_NAME>
```

**Packaging services**

```shell
# Package a single service
yarn build <SERVICE_NAME>


# Package all services afffected by a change
yarn affected:build


# Package all services
yarn all:build
```

Pass the `--stage <STAGE_NAME>` flag if you're creating a build for a specific environment.

**Deploying services**

```shell
# Deploy a single service to a stage
yarn deploy:<stage> <SERVICE_NAME>

# Deploy all services to a stage
yarn deploy:all:<stage>
```

where `<stage>` is one of: `[dev, stage, prod]`.

**Removing deployed service**

```shell
# Remove a single service from a stage
yarn remove:<stage> <SERVICE_NAME>

# Remove all services for a stage
yarn remove:all:<stage>
```

where `<stage>` is one of: `[dev, stage, prod]`.

**Run tests**

```shell
# Run tests for a single service or library
yarn test <SERVICE_OR_LIB_NAME>

# Run tests for all services or libraries affected by a change
yarn test:affected

# Run all tests
yarn test:all
```

**Analyze function bundles**

When building serverless applications, it's important to understand your memory footprint due to Lambda's memory settings as you can experience unexpected errors. As such, the following script can be used to understand the memory footprint of your individual functions:

```shell
yarn analyze <SERVICE_NAME> --function=<FUNCTION_NAME>
```

This will open the results in a new tab in your browser with the results using [esbuild visualizer](https://www.npmjs.com/package/esbuild-visualizer).

**Run offline / locally**

- To run a single service

```shell
yarn serve <SERVICE_NAME>
```

**Understand your workspace**

```
yarn dep-graph
```

## Further help

- Visit [Serverless Documentation](https://www.serverless.com/framework/docs/) to learn more about Serverless framework
- Visit [Nx Documentation](https://nx.dev) to learn more about Nx dev toolkit

## Contribution

Found an issue? Feel free to raise an issue with information to reproduce. Pull requests are welcome to improve.

## Support

If you like this template, please go support [sudokar](https://github.com/sudokar) as this template would not have been possible without their original work. However, you can always leave this version a star ⭐. 😄

## Maintainer

This version of the template is authored and maintained by [dustinsgoodman](https://github.com/dustinsgoodman)

## License

MIT
