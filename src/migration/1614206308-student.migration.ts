const studentCreateTableQuery = `
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
`;
