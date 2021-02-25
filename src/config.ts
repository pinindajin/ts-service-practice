import convict from 'convict';

const config = convict({
  env: {
    doc: 'The node application environment.',
    format: [
      'production',
      'staging',
      'development',
      'test',
      'stage',
      'prod',
      'dev',
    ],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3030,
    env: 'PORT',
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'Value DB_HOST not set.',
      env: 'DB_HOST',
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'Value DB_NAME not set.',
      env: 'DB_NAME',
    },
    username: {
      doc: 'Database name',
      format: String,
      default: 'Value DB_USERNAME not set.',
      env: 'DB_USERNAME',
    },
    password: {
      doc: 'Database name',
      format: String,
      default: 'Value DB_PASS not set.',
      env: 'DB_PASS',
    },
    port: {
      doc: 'Database port',
      format: Number,
      default: 5432,
      env: 'DB_PORT',
    },
  },
});

const env = process.env.NODE_ENV;
if (env === 'dev' || env === 'development') config.loadFile('./local.env.json');

config.validate({allowed: 'strict'});

export default config.get();
