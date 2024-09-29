import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MemberService } from './use-case/member.service';
import { CreateMemberDto } from './core/dto/create-member.dto';
import { UpdateMemberDto } from './core/dto/update-member.dto';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { BasicGuard } from 'src/utils/guards/basic';

@ApiTags('member')
@Controller('member')
@ApiBasicAuth()
@UseGuards(BasicGuard)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async create(@Body() createMemberDto: CreateMemberDto) {
    return await this.memberService.create(createMemberDto);
  }

  @Get()
  async findAll() {
    return await this.memberService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.memberService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return await this.memberService.update(id, updateMemberDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.memberService.remove(id);
  }
}
