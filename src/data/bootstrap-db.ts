import {createConnection, ConnectionOptions, Connection} from 'typeorm';
import config from '../config';
import {retry} from '../util/retry';
import {Student} from './entity/';
import {Student1614799448000} from './migration';

export const bootstrapDb = async (): Promise<Connection> => {
  const sslOptions = config?.db?.ssl?.cert
    ? {
        ssl: {
          ca: Buffer.from(config.db.ssl.cert || ''),
        },
      }
    : {};

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
    ...sslOptions,
  };

  const tryConnecting = async () => createConnection(connectionOptions);

  const connection = await retry(
    tryConnecting,
    config.db.retry.maxRetryCount,
    config.db.retry.retrySleep,
    'Database connection'
  );

  return connection;
};
