# Table of Contents

- [Getting started](#getting-started)
- [Running everything fully dockerized](#running-everything-fully-dockerized)
- [Testing in docker](#testing-in-docker)
- [Gotchas](#gotchas)

## Getting started

Run `nvm use && npm i` to install dependencies. Run `compose up db` to start Postgres. Once Postgres is started run `npm run migrate` to run migrations.

Finally just run `npm run start:dev` to start the service with ts-node in watch mode using nodemon. From here on out all you need to do is run `docker-compose up db` and `npm run start:dev` to get to developing. You can run `npm run test` to run tests.

When not running the service in docker you can use the `local.env.json` for defining environment variables.

## Running everything fully dockerized

To run everything dockerized in dev simply run `docker-compose -f docker-compose.dev.yml`. To run everything fully dockerized using latest image from docker hub run `docker-compose up`.

If everything started correctly without exiting you should be good to go. Make requests to the exposed port (probably `3030`) in your `docker-compose.yml` to verify everything works.

This is useful for testing things fully dockerized in dev. This makes no opinions about how things are deployed in prod. For example a common pattern is to use `docker-compose` for development and then in higher environments to have a dedicated store (such as an RDS/Aurora instance from AWS) and deploy your service on something like a Digital Ocean Droplet, AWS EC2 instance, or some k8s cluster. Rather than using `docker-compose` to inject the environment variables you'll likely use some other tool like Vault (https://www.vaultproject.io/) to manage this.

When running the service in docker you'll need to define environment variables in the appropriate `docker-compose` file(s).

## Testing in docker

Run `docker-compose -f docker-compose.test.yml up` to run tests in the fully dockerized environment.

This will be useful for testing in CI.

## Gotchas

If you want to set up `docker-compose` to work against a database with SSL you will need to define `SSL_CERT` in the `environment` block of your compose file. This will need to be the base64 contents of your cert.

`prod.env.json` and `docker-compose.prod.yml` is added to the `.gitignore`. You shouldn't have a reason to connect to a prod database in development. But if for some reason you want to this is done just as a safety precaution to help you avoid commiting files with sensitive secrets.

## Deploying

There are multiple ways... but here is one.

Create a repo in Docker Hub. Set up the Github to DockerHub integration. Set the build rules. A good build rule is to base it on tags so you can control deploys with releases in Github. Be sure to set two build rules - one for the version and one for latest. Set up a managed Postgres database on Digital Ocean. Don't set any trusted sources. Warning this is not good idea, BUT the App Platform does not yet support trusted sources. To add some extra security you should set up a user and database other than the default user and databae to access your database. Be sure to download your ssl certificate. Set up an app in Digital Ocean's App Platform.  Set it to use Docker Hub as your source. Enter in the appropriate environment variables. Remember that the SSL_CERT should be a base64 encoded string of your ssl certificate contents. If everything was done correctly you should now have a deployed service.
