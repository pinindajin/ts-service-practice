import {createConnection, ConnectionOptions} from 'typeorm';
import config from '../config';
import {Student} from './entity/';
import {Student1614799448000} from './migration';

export const bootstrapDb = async () => {
  const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,
    entities: [Student],
    migrations: [Student1614799448000],
    migrationsRun: false,
    logging: false,
    synchronize: false,
  };
  return await createConnection(connectionOptions);
};
