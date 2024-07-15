import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { MembrosFamiliasService } from './membros-familias.service';
import { CreateMembroFamiliaDto } from './dto/create-membros-familia.dto';
import { UpdateMembroFamiliaDto } from './dto/update-membros-familia.dto';
import { CustomRequest } from '../../core/custom/custom-request.interface';
import { Transaction } from 'sequelize';
import { Public } from '../../core/decorator/public.decorator';

@Public()
@Controller('membros-familias')
export class MembrosFamiliasController {
  constructor(
    private readonly membrosFamiliasService: MembrosFamiliasService,
  ) {}

  @Post()
  create(
    @Body() createMembroFamiliaDto: CreateMembroFamiliaDto,
    @Req() request: CustomRequest,
  ) {
    const transaction: Transaction = request.transaction;
    return this.membrosFamiliasService.create(
      createMembroFamiliaDto,
      transaction,
    );
  }

  @Get()
  findAll() {
    return this.membrosFamiliasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membrosFamiliasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMembroFamiliaDto: UpdateMembroFamiliaDto,
    @Req() request: CustomRequest,
  ) {
    const transaction: Transaction = request.transaction;
    return this.membrosFamiliasService.update(
      +id,
      updateMembroFamiliaDto,
      transaction,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: CustomRequest) {
    const transaction: Transaction = request.transaction;
    return this.membrosFamiliasService.remove(+id, transaction);
  }
}
