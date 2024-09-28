import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: 'sempertex.postgres',
  port: 5432,
  username: 'postgres',
  password: 'vo5uB9viNm8LV27qVz4S',
  database: 'postgres',
  logging: false,
  synchronize: false,
  entities: ['src/database/core/entities/*.entity{.ts, .js}'],
  migrations: ['src/database/core/migrations/up/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
