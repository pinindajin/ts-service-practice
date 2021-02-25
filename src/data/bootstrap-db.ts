import {createConnection, ConnectionOptions} from 'typeorm';
import config from '../config';
import {Student} from './entity/';

export const bootstrapDb = async () => {
  const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,
    entities: [Student],
    logging: false,
    synchronize: false,
  };
  await createConnection(connectionOptions);
};
