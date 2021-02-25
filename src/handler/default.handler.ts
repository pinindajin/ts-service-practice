import {Context, Next} from 'koa';
import {getStudentRepo} from '../data/repository/student.repository';

const healthCheck = async (ctx: Context, next: Next) => {
  await getStudentRepo().save({
    id: '389b0b4e-f8b8-48b3-9e34-8256549187da',
    firstName: 'firsty',
    lastName: 'mclasterson',
    createDate: new Date(),
  });
  ctx.status = 200;
  next();
};

const echo = (ctx: Context, next: Next) => {
  ctx.response.body = ctx.request.body;
  ctx.status = 200;
  next();
};

export {healthCheck, echo};
