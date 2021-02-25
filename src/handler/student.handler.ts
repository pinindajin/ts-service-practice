import {Context, Next} from 'koa';
import {getStudentRepo} from '../data/repository/student.repository';
import {
  CreateStudentRequest,
  createStudentValidator,
} from '../data/dto/student.dto';
import {v4 as uuid} from 'uuid';

export const createStudent = async (ctx: Context, next: Next) => {
  const newStudent: CreateStudentRequest = ctx.request.body;

  try {
    const {error} = createStudentValidator.validate(newStudent);
    if (error) throw new Error(error.message);
  } catch (err) {
    ctx.status = 400;
    ctx.response.body = {error: err.toString()};
    return next();
  }

  const studentToCreate = {
    id: uuid(),
    firstName: newStudent.firstName,
    lastName: newStudent.lastName,
    age: newStudent.age,
    state: newStudent.state,
    createDate: new Date(),
  };
  await getStudentRepo().save(studentToCreate);

  ctx.status = 201;
  ctx.response.body = studentToCreate;
  next();
};

export const getStudentById = async (ctx: Context, next: Next) => {
  const {studentId} = ctx.params;
  const student = (await getStudentRepo().findByIds(studentId))[0];
  ctx.response.body = student;
  ctx.status = 200;
  next();
};

// const getStudentById = async (ctx: Context, next: Next) => {};
