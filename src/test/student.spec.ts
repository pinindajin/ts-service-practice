import request from 'supertest';
import {server} from '../server';
import {bootstrapDb} from '../data/bootstrap-db';
import {getStudentRepo} from '../data/repository/student.repository';
import {v4 as uuid} from 'uuid';

describe('Integration;API;Student', () => {
  beforeAll(async () => {
    await bootstrapDb();
  });

  describe('GET /:studentId', () => {
    const newStudent = {
      id: uuid(),
      firstName: 'sharlene',
      lastName: 'albertson',
      age: 33,
      state: 'UT',
      createDate: new Date(),
    };
    beforeAll(async () => {
      await getStudentRepo().save(newStudent);
    });

    it('should return a 200 with a matching student', async () => {
      const result = await request(server.callback()).get(
        `/student/${newStudent.id}`
      );
      expect(result.status).toEqual(200);
      expect({
        ...result.body,
        createDate: new Date(result.body.createDate),
      }).toEqual(newStudent);
    });
  });

  describe('POST /', () => {
    it('should return a 201 with created user data', async () => {
      const result = await request(server.callback())
        .post('/student')
        .send(
          JSON.stringify({
            firstName: 'test_first',
            lastName: 'test_last',
          })
        )
        .set('Content-Type', 'application/json');
      expect(result.status).toEqual(201);
      expect(result.body.firstName).toEqual('test_first');
      expect(result.body.lastName).toEqual('test_last');
      expect(result.body.id).toBeDefined();
      expect(result.body.createDate).toBeDefined();
    });
  });
});
