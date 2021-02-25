import Router from '@koa/router';
import bodyparser from 'koa-bodyparser';
import Koa from 'koa';
import {defaultRouter, studentRouter} from './router/';

export const getServer = (): Koa<Koa.DefaultState, Koa.DefaultContext> => {
  const server = new Koa();

  // Middleware
  server.use(bodyparser());

  // Routes
  server.use(defaultRouter.routes());
  server.use(studentRouter.routes());

  return server;
};
