# Table of Contents

- [Create Service](#create-service)
  - [Init repo](#init-repo)
  - [Init Typescript](#init-typescript)
  - [Update tsconfig](#update-tsconfig)
  - [Get basic deps for a service](#get-basic-deps-for-a-service)
  - [Basic server](#basic-server)
- [Create Docker Image](#create-docker-image)
  - [Dockerizing the server](#dockerizing-the-server)
  - [Running the image](#running-the-image)

# Create Service

## Init repo

- `npm init`

## Init Typescript

We are using Google's TypeScript guide here. There are other options, but they provide a good style and starting point.

- `npx gts init`

## Update tsconfig

- add `"esModuleInterop": true` to the tsconfig.json under the compilerOptions. This allows us to import CommonJS modules into an ES6 module project without needing to alias imports.

  `import * as Koa from 'koa'` becomes `import Koa from 'koa'`

  Longer explanation here https://stackoverflow.com/questions/56238356/understanding-esmoduleinterop-in-tsconfig-file

## Get basic deps for a service

We will be using koa as the primary tool for our server. We'll also be using the bodyparser middleware and koa's router. We also want to install the types as dev dependencies.

```
npm i -S koa
npm i -D @types/koa
npm i -S koa-bodyparser
npm i -D @types/koa-bodyparser
npm i -S @koa/router
npm i -D @types/koa__router
```

## Basic server

Here is a basic server that will respond with a 200 if you do a GET request to it and will mirror your request by responding with the payload of any POST request you make to it.

```
import Router from '@koa/router';
import bodyparser from 'koa-bodyparser';
import Koa, { Context, Next } from 'koa';
const app = new Koa();

// Middleware
app.use(bodyparser());

// Routes
const defaultRouter = new Router();
defaultRouter.get('/', (ctx: Context, next: Next) => {
    ctx.status = 200;
    next();
});
defaultRouter.post('/', (ctx: Context, next: Next) => {
    ctx.response.body = ctx.request.body;
    ctx.status = 200;
    next();
});
app.use(defaultRouter.routes());

// Startup
const PORT = process.env.SERVICE_PORT || 3030
app.listen(PORT);
console.log(`Service listening on port ${PORT}.`)
```

Simply create an `app.ts` file in the `src` dir. There might already be an `index.ts` there that you can rename or just use. You can test this simple server without needing to compile it by running `app.ts` with `ts-node`. Run `npm i -g ts-node` to install `ts-node`. Alternatively you can run `tsc` to build the project and run the `app.js` file in the `build/src` dir with `node`. Run `npm i -g typescript` to install typescript which will then expose the `tsc` command to you for building.

# Create Docker Image

## Dockerizing the server

The next step we want to do is to dockerize our server. The first thing we'll need is a `Dockerfile`. Let's create one in the root directory.

For the base image we want to use an `alpine` image with the LTS version of node. As of Feb 8 2020 this is `14.15.4` so we'll want to add the following line to our `Dockerfile`.

```
FROM node:14.15.4-alpine3.11
```

To follow good security practices we'll want to make sure we build and run our server with a non root user. The node image comes with a user called `node`. Let's build our work directory and give the `node` user ownership of it.

```
RUN mkdir -p /home/node/ts-service-practice/node_modules && chown -R node:node /home/node/ts-service-practice

WORKDIR /home/node/ts-service-practice
```

We'll also need to add one additional dependency to our application. Run `npm i -D typescript` to add Typescript as a dev dependency so that our build stage will have access to the `tsc` command (Run this in our terminal - don't add it to our Dockerfile).

Next we will install our dependencies as the `node` user and compile our javascript.

```
USER node
COPY --chown=node:node . .
RUN npm install
RUN npm run compile
```

Note that using `gts` earlier to setup our project for typescript provides us with the npm script `compile`. If you choose not to use `gts` that is ok - all you need to do is run `tsc` within the build to compile typescript.

Finally we want to expose a port for the app and provide the image with a startup command.

```
EXPOSE 3030
CMD [ "node", "./build/src/app.js" ]
```

It should be noted that the `EXPOSE` command does not actually publish the port. It is meant as a documentation for the person running the a container from the image. It is commonly omitted, but since we set up a default port in our server code we'll include the `EXPOSE` and pass it an argument mirroring our default port of `3030`. For reference here is the line setting a default port in our server code `const PORT = process.env.SERVICE_PORT || 3030`.

## Running the image

Let's build a docker image now! Run `docker build -t <image-name> .` to build the image.

After the image builds you can run `docker images` and you should see your freshly built image in the output.

To run the image use the following command `docker run --name <container-name> -p <host-port>:<container-port> -d <image-name>`. Be sure to supply the same image name as you did for the `docker build` command. The container name can be whatever you wish. The container port should match what you used for your `EXPOSE` command in the dockerfile - `3030`. Further on we'll talk about how to provide environment variables to our container. Once we do this then the container port should match the value we provide for the `SERVICE_PORT` environment variable. You can provide whatever port you wish for the host port. For examples further down well be using `3020` for the host port.

Once the container is running, you can then run `docker ps` to verify that it has started up correctly.

If the server is indeeded started correctly it's now time to do a manual test by making a request against the GET and POST endpoints of the server. You can use postman for this. But here are also some conventient commands you can also use.

Test the GET by running

```
curl localhost:3020
```

and you should get back a 200 OK.

Test the POST by running

```
curl --location --request POST 'localhost:3020' \
--header 'Content-Type: application/json' \
--data-raw '{"test": "testValue"}'
```

and you should get back a 200 with the response body mirroring the request body (`{"test":"testValue"}`).

# Adding a data store

## Postgres

Now that we have a dockerized app we're going to add a data store. We'll use postgres for our data store since it's free, easy to use, and has great features for everything from a side project -> startup -> enterprise level.

We'll use docker compose to manage the backing services for our local development (we'll also use this for running our tests in CI - but we'll get to this later). To do this create a `docker-compose.yml` in your root directory. We'll be using the `postgres` docker image. The contents of your `docker-compose.yml` should be updated to have the following.

```
version: '3.1'

services:
  db:
    image: postgres
    ports:
      - '5432:5432'
    volumes:
      - ./docker/var/lib/postgres:/var/lib/postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: service_user_pass
      POSTGRES_USER: service_user
      POSTGRES_DB: service_db
```

Now run `docker-compose up` in the root directory of your project. This starts up all the services defined your `docker-compose.yml` in docker. Using the creds given in the `environment` key of your `db` service in the `docker-compose.yml` you should be able to connect to postgres using a postgres compatible client at the address `localhost:5432`. You can use whichever client you wish. I use Postico (https://eggerapps.at/postico/) and from here out will refer to our postgres compatible client as just Postico. Another good client is SQLTabs (https://www.sqltabs.com/)[more simple] or pgAdmin (https://www.pgadmin.org/)[more complex]. There's of course more than these 3 - pick what works for you.

## TypeORM

Ok so we can connect to our database with Postico.
