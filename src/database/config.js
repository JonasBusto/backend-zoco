import pg from 'pg';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from '../helpers/constants.js';

const CONFIG_CONNECTION = {
  ssl: true,
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_DATABASE,
};

export const CONNECTION_DB = new pg.Pool(CONFIG_CONNECTION);
