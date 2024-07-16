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
import { MembrosService } from './membros.service';
import { CreateMembroDto } from './dto/create-membro.dto';
import { CustomRequest } from 'src/core/custom/custom-request.interface';
import { Transaction } from 'sequelize';
import { MembroRepository } from './repository/membro.repository';
import { UtilDataHora } from '../../core/util/date/utilidades-data-hora';

@Controller('membros')
export class MembrosController {
  constructor(
    private readonly membrosService: MembrosService,
    private readonly membroRepository: MembroRepository,
  ) {}

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

  @Get('/aniversariantes-semana')
  async buscarAniversariantesSemana() {
    const dataHora = await this.membroRepository.getDataHora();
    const domingoSemana = UtilDataHora.primeiroDiaDaSemana(dataHora);
    const sabadoSemana = UtilDataHora.ultimoDiaDaSemana(dataHora);

    return await this.membroRepository.buscarAniversariantesSemana(
      domingoSemana,
      sabadoSemana,
    );
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
