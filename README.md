# Table of Contents

- [Getting started](#getting-started)
- [Running everything fully dockerized](#running-everything-fully-dockerized)
- [Testing in docker](#testing-in-docker)

## Getting started

Run `nvm use && npm i` to install dependencies. Run `compose up db` to start Postgres. Once Postgres is started run `npm run migrate` to run migrations.

Finally just run `npm run start:dev` to start the service with ts-node in watch mode using nodemon. From here on out all you need to do is run `docker-compose up db` and `npm run start:dev` to get to developing. You can run `npm run test` to run tests.

## Running everything fully dockerized

Run `npm run docker:build` to build the service image. Once it is built run `docker-compose up` to start the service alongside postgres in docker. If everything started correctly without exiting you should be good to go. Make requests to the exposed port (probably `3030`) in your `docker-compose.yml` to verify everything works.

This is useful for testing things fully dockerized in dev. This makes no opinions about how things are deployed in prod. For example a common pattern is to use `docker-compose` for development and then in higher environments to have a dedicated store (such as an RDS/Aurora instance from AWS) and deploy your service on something like a Digital Ocean Droplet, AWS EC2 instance, or some k8s cluster. Rather than using `docker-compose` to inject the environment variables you'll likely use some other tool like Vault (https://www.vaultproject.io/) to manage this.

## Testing in docker

Run `npm run docker:build` if you have recent changes then run `docker-compose -f docker-compose.test.yml up` to run tests in the fully dockerized environment.

This will be useful for testing in CI.
