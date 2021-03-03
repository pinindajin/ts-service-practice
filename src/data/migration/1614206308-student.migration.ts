import {MigrationInterface, QueryRunner} from 'typeorm';

export class Student1614799448000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS student (
        id text PRIMARY KEY UNIQUE,
        first_name text NOT NULL,
        last_name text NOT NULL,
        age smallint,
        state text,
        create_date timestamp with time zone NOT NULL
      );
      CREATE UNIQUE INDEX IF NOT EXISTS student_pkey ON student(id text_ops);
      CREATE UNIQUE INDEX IF NOT EXISTS student_id_key ON student(id text_ops);
    `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS student_id_key;
      DROP TABLE IF EXISTS student;
    `);
  }
}
