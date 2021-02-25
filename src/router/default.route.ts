import Router from '@koa/router';
import {healthCheck, echo} from '../handler/';

const defaultRouter = new Router();

defaultRouter.get('/', healthCheck);
defaultRouter.post('/', echo);

export default defaultRouter;
