import Joi from 'joi';

export const createStudentValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  state: Joi.string().optional(),
  age: Joi.number().optional(),
});

export type CreateStudentRequest = {
  firstName: string;
  lastName: string;
  state: string;
  age: number;
};

export type CreateStudentResponse = {
  id: string;
  firstName: string;
  lastName: string;
  state: string;
  age: number;
  createDate: Date;
};
