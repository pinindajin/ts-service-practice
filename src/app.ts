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