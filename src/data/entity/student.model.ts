import {Entity, Column} from 'typeorm';

@Entity('student')
export class Student {
  @Column({name: 'id', nullable: false, primary: true, type: 'uuid'})
  id: string;

  @Column({name: 'first_name', nullable: false, type: 'text'})
  firstName: string;

  @Column({name: 'last_name', nullable: false, type: 'text'})
  lastName: string;

  @Column({name: 'age', nullable: true, type: 'smallint'})
  age: number;

  @Column({name: 'state', nullable: true, type: 'text'})
  state: string;

  @Column({name: 'create_date', nullable: false, type: 'time with time zone'})
  createDate: Date;
}
