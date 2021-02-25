import Router from '@koa/router';
import {createStudent, getStudentById} from '../handler';

const studentRouter = new Router({prefix: '/student'});

studentRouter.post('/', createStudent);
studentRouter.get('/:studentId', getStudentById);

export default studentRouter;
