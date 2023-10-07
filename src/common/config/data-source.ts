import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: `.env`,
});

const Config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: JSON.parse(process.env.POSTGRES_SYNCHRONIZE),
  entities: ['src/modules/**/*.entity{.ts, .js}'],
  migrations: ['src/migrations/*{.ts, .js}'],
};

export const AppDataSource: DataSource = new DataSource(Config);
