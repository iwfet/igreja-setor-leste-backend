import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TelaService } from './tela.service';
import { CreateTelaDto } from './dto/create-tela.dto';
import { UpdateTelaDto } from './dto/update-tela.dto';
import { AllowAccess } from '../../core/decorator/AllowAccess';

@Controller('telas')
export class TelaController {
  constructor(private readonly telaService: TelaService) {
  }

  @Post()
  create(@Body() createTelaDto: CreateTelaDto) {
    return this.telaService.create(createTelaDto);
  }

  @AllowAccess()
  @Get('ativas')
  buscarTelasAtivas() {
    return this.telaService.buscarTelasAtivas();
  }

  @Get()
  findAll() {
    return this.telaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.telaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTelaDto: UpdateTelaDto) {
    return this.telaService.update(+id, updateTelaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.telaService.remove(+id);
  }
}
