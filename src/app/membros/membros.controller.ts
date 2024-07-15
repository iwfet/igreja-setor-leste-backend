import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MembrosService } from './membros.service';
import { CreateMembroDto } from './dto/create-membro.dto';
import { CustomRequest } from 'src/core/custom/custom-request.interface';
import { Transaction } from 'sequelize';
import { Public } from '../../core/decorator/public.decorator';
import { AdminGuard } from '../../core/guards/check-admin.guard';

@Controller('membros')
export class MembrosController {
  constructor(private readonly membrosService: MembrosService) {}

  @Post()
  create(
    @Body() createMembroDto: CreateMembroDto,
    @Req() request: CustomRequest,
  ) {
    const transaction: Transaction = request.transaction;
    return this.membrosService.create(createMembroDto, transaction);
  }

  @Get()
  findAll(@Req() request: CustomRequest) {
    console.log(request);
    return this.membrosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.membrosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMembroDto: Partial<CreateMembroDto>,
    @Req() request: CustomRequest,
  ) {
    const transaction: Transaction = request.transaction;
    return this.membrosService.update(+id, updateMembroDto, transaction);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: CustomRequest) {
    const transaction: Transaction = request.transaction;
    return this.membrosService.remove(+id, transaction);
  }
}
