import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'testdb',
  synchronize: true, // automatically create tables (use only in dev)
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
