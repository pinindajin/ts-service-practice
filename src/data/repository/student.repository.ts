import {getCustomRepository, EntityRepository, Repository} from 'typeorm';
import {Student} from '../entity/student.model';

@EntityRepository(Student)
class StudentRepository extends Repository<Student> {
  test() {
    return this.save({
      id: '',
      firstName: '',
      lastName: '',
      createdAt: new Date(),
    });
  }
}

const getStudentRepo = () => getCustomRepository(StudentRepository);

export {getStudentRepo};
