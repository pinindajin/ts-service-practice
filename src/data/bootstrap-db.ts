import {createConnection, ConnectionOptions, Connection} from 'typeorm';
import config from '../config';
import {retry} from '../util/retry';
import {Student} from './entity/';
import {Student1614799448000} from './migration';

export const bootstrapDb = async (): Promise<Connection> => {
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

  const tryConnecting = async () => createConnection(connectionOptions);

  const connection = await retry(
    tryConnecting,
    10,
    9000,
    'Database connection'
  );
  // const MAX_RETRIES = 10;
  // const RETRY_BOUNCE_IN_MS = 9000;

  // for (let i = 0; i < MAX_RETRIES; i++) {
  //   try {
  //     console.log(`Attempting to connect to DB. Attempt number ${i + 1}`);
  //     connection = await createConnection(connectionOptions);
  //     console.log('Successfully connected to DB.');
  //     break;
  //   } catch (err) {
  //     console.log(
  //       `Failed to create connection with DB. Retrying in ${RETRY_BOUNCE_IN_MS} ms`
  //     );
  //     await sleep(RETRY_BOUNCE_IN_MS);
  //   }
  // }

  return connection;
};
