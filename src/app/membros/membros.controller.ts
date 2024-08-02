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
import { MembroRepository } from './repository/membro.repository';
import { UtilDataHora } from '../../core/util/date/utilidades-data-hora';
import { Public } from '../../core/decorator/public.decorator';

@Public()
@Controller('membros')
export class MembrosController {
  constructor(
    private readonly membrosService: MembrosService,
    private readonly membroRepository: MembroRepository,
  ) {}

  @Post()
  create(@Body() createMembroDto: CreateMembroDto) {
    return this.membrosService.create(createMembroDto);
  }

  @Get()
  findAll() {
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
  ) {
    return this.membrosService.update(+id, updateMembroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membrosService.remove(+id);
  }
}
