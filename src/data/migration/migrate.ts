import {timeStamp} from 'console';
import {bootstrapDb} from '../bootstrap-db';

(async () => {
  const connection = await bootstrapDb();
  try {
    const migrationResult = await connection.runMigrations();
    const migrationsRun = migrationResult.map(m => ({
      name: m.name,
      timestamp: m.timestamp,
    }));
    console.log(`Migrations Complete. ${JSON.stringify(migrationsRun)}`);
  } catch (err) {
    console.log(`Migrations Failed. ${JSON.stringify(err)}`);
  }
})();
