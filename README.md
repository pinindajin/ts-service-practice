## Init repo
- `npm init`

## Init typescript
We are using Google's TypeScript guide here. There are other options, but they provide a good style and starting point.
- `npx gts init`

## Update tsconfig
- add `"esModuleInterop": true` to the tsconfig.json under the compilerOptions. This allows us to import CommonJS modules into an ES6 module project without needing to alias imports. 

    `import * as Koa from 'koa'` becomes `import Koa from 'koa'`

    Longer explanation here https://stackoverflow.com/questions/56238356/understanding-esmoduleinterop-in-tsconfig-file

## Get basic deps for a service
We will be using koa as the primary tool for our server. We'll also be using the bodyparser middleware and koa's router. We also want to install the types as dev dependencies. `npm i -S koa && npm i -D @types/koa && npm i -S koa-bodyparser && npm i -D @types/koa-bodyparser && npm i -S @koa/router && npm i -D @types/koa__router`

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
app.listen(3000);
```

Simply create an `app.ts` file in the `src` dir. There might already be an `index.ts` there that you can rename or just use. You can test this simple server without needing to compile it by running `app.ts` with `ts-node`. Run `npm i -g ts-node` to install `ts-node`. Alternatively you can run `tsc` to build the project and run the `app.js` file in the `build/src` dir with `node`. Run `npm i -g typescript` to install typescript which will then expose the `tsc` command to you for building.