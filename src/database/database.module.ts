import { Module } from '@nestjs/common';
import { databasePostgres } from './database.service';

@Module({
  imports: [databasePostgres],
  exports: [databasePostgres],
})
export class DatabaseModule {}
