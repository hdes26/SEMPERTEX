import { Module } from '@nestjs/common';
import { MemberService } from './use-case/member.service';
import { MemberController } from './member.controller';
import { LoggerModule } from 'src/settings/logger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/database/core/entities';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
