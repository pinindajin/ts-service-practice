import {server} from './server';
import {bootstrapDb} from './data/bootstrap-db';
import config from './config';

const start = async () => {
  // Bootstrap
  await bootstrapDb();

  // Server
  const PORT = config.port;
  server.listen(PORT);
  console.log(`Service listening on port ${PORT}.`);
};
start();
