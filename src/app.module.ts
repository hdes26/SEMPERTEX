import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './features/project/project.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './settings/validation';
import { BasicStrategy } from './utils/strategies/basic';
import { DatabaseModule } from './database/database.module';
import { TaskModule } from './features/task/task.module';
import { MemberModule } from './features/member/member.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    DatabaseModule,
    ProjectModule,
    TaskModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [AppService, BasicStrategy],
})
export class AppModule {}
