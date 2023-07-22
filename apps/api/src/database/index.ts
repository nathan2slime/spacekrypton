import { envs } from '@kry/envs';
import { DataSourceOptions } from 'typeorm';

import entities from '../app/models';

export const config = {
  type: envs.DATABASE_TYPE,
  port: envs.DATABASE_PORT,
  host: envs.DATABASE_HOST,
  username: envs.DATABASE_USER,
  password: envs.DATABASE_PASSWORD,
  database: envs.DATABASE_NAME,
  entities,
  synchronize: envs.NODE_ENV == 'development',
  keepConnectionAlive: true,
  retryAttempts: 2,
  retryDelay: 1000,
  ssl: {
    rejectUnauthorized: envs.NODE_ENV == 'production',
  },
} as DataSourceOptions;
