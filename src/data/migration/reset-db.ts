import {bootstrapDb} from '../bootstrap-db';
import config from '../../config';

(async () => {
  const nodeEnv = config.env;
  if (['prod', 'production'].includes(nodeEnv)) {
    console.log(
      'Skipping dropping database and data because the current environment is production. Please reconsider why you want to do this and do it manually in a transaction.'
    );
  } else {
    const connection = await bootstrapDb();
    try {
      console.log('Dropping databse and all tables.');
      await connection.dropDatabase();
      console.log('Dropping db and data successful.');
    } catch (err) {
      console.log(`Dropping db and data failed. ${JSON.stringify(err)}`);
    }
  }
})();
