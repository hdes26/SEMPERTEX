import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from '../core/dto/create-member.dto';
import { UpdateMemberDto } from '../core/dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member, TaskMember } from 'src/database/core/entities';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/settings/logger';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(TaskMember)
    private readonly taskMemberRepository: Repository<TaskMember>,
    private readonly logger: LoggerService,
  ) {}
  async create(createMemberDto: CreateMemberDto) {
    try {
      return await this.memberRepository.save(createMemberDto);
    } catch (error) {
      this.logger.error(MemberService.name, error);
      throw error;
    }
  }

  async findAll() {
    try {
      const members = await this.memberRepository.find({
        where: { is_deleted: false },
      });

      return members;
    } catch (error) {
      this.logger.error(MemberService.name, error);
      throw error;
    }
  }

  async assignedTasks(id: string) {
    try {
      const member = await this.memberRepository.findOne({
        where: { id },
      });

      if (!member) {
        throw new NotFoundException(`Member with ID ${id} not found.`);
      }
      return await this.taskMemberRepository.find({
        relations: ['task'],
        where: { member: { id: member.id } },
      });
    } catch (error) {
      this.logger.error(MemberService.name, error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const member = await this.memberRepository.findOne({
        where: { id },
      });
      if (!member) {
        throw new NotFoundException(`Member with ID ${id} not found.`);
      }

      return member;
    } catch (error) {
      this.logger.error(MemberService.name, error);
      throw error;
    }
  }

  async update(id: string, updateMemberDto: UpdateMemberDto) {
    try {
      const member = await this.memberRepository.findOneOrFail({
        where: { id },
      });

      if (!member) {
        throw new NotFoundException(`Member with ID ${id} not found.`);
      }

      return await this.memberRepository.update(member.id, updateMemberDto);
    } catch (error) {
      this.logger.error(MemberService.name, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const member = await this.memberRepository.findOneOrFail({
        where: { id },
      });

      if (!member) {
        throw new NotFoundException(`Member with ID ${id} not found.`);
      }

      return await this.memberRepository.update(member.id, {
        deleted_at: new Date(),
        is_deleted: true,
      });
    } catch (error) {
      this.logger.error(MemberService.name, error);
      throw error;
    }
  }
}
