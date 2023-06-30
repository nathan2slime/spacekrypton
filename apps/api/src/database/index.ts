import { DataSourceOptions } from 'typeorm';

import entities from '../app/models';

export const config = {
  type: process.env.DATABASE_TYPE,
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  keepConnectionAlive: true,
  retryAttempts: 2,
  retryDelay: 1000,
  entities,
} as DataSourceOptions;
