import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './core/entities';
const entitiesLists = Object.values(entities);

export const databasePostgres = TypeOrmModule.forRootAsync({
  imports: [ConfigModule.forRoot({})],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres',
      host: configService.get<string>('PGHOST'),
      port: configService.get<number>('PGPORT'),
      username: configService.get<string>('PGUSER'),
      password: configService.get<string>('PGPASSWORD'),
      database: configService.get<string>('PGDATABASE'),
      logging: false,
      entities: entitiesLists,
      synchronize: false,
      then: Logger.debug(
        `postgres host:${configService.get<string>('PGHOST')}`,
        `DB =>`,
      ),
    };
  },
});
