import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { FiliacoesService } from './filiacoes.service';
import { CreateFiliacaoDto } from './dto/create-filiacoe.dto';
import { CustomRequest } from '../../core/custom/custom-request.interface';
import { Transaction } from 'sequelize';
import { Public } from '../../core/decorator/public.decorator';

@Public()
@Controller('filiacoes')
export class FiliacoesController {
  constructor(private readonly filiacoesService: FiliacoesService) {}

  @Post()
  create(
    @Body() createFiliacaoDto: CreateFiliacaoDto,
    @Req() request: CustomRequest,
  ) {
    const transaction: Transaction = request.transaction;
    return this.filiacoesService.create(createFiliacaoDto, transaction);
  }

  @Get()
  findAll() {
    return this.filiacoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filiacoesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFiliacoeDto: Partial<CreateFiliacaoDto>,
    @Req() request: CustomRequest,
  ) {
    const transaction: Transaction = request.transaction;
    return this.filiacoesService.update(+id, updateFiliacoeDto, transaction);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: CustomRequest) {
    const transaction: Transaction = request.transaction;
    return this.filiacoesService.remove(+id, transaction);
  }
}
