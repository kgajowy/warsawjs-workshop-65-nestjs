import { DataSource } from 'typeorm';

/**
 * Just for migrations & brevity; Should read config from envs
 */
export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'nestjs',
  password: 'nestjs',
  database: 'nestjs',
  synchronize: false,
  logging: false,
  entities: ['**/*.entity.ts'],
  migrations: ['./src/migrations/*.ts'],
});
