import bodyparser from 'koa-bodyparser';
import Koa from 'koa';
import {defaultRouter, studentRouter} from './router/';

const server = new Koa();

// Middleware
server.use(bodyparser());

// Routes
server.use(defaultRouter.routes());
server.use(studentRouter.routes());

export {server};
