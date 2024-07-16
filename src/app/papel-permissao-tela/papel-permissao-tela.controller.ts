import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PapelPermissaoTelaService } from './papel-permissao-tela.service';
import { CreatePapelPermissaoTelaDto } from './dto/create-papel-permissao-tela.dto';
import { UpdatePapelPermissaoTelaDto } from './dto/update-papel-permissao-tela.dto';

@Controller('papel-permissao-tela')
export class PapelPermissaoTelaController {
  constructor(
    private readonly papelPermissaoTelaService: PapelPermissaoTelaService,
  ) {}

  @Post()
  create(@Body() createPapelPermissaoTelaDto: CreatePapelPermissaoTelaDto) {
    return this.papelPermissaoTelaService.create(createPapelPermissaoTelaDto);
  }

  @Get()
  findAll() {
    return this.papelPermissaoTelaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.papelPermissaoTelaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePapelPermissaoTelaDto: UpdatePapelPermissaoTelaDto,
  ) {
    return this.papelPermissaoTelaService.update(
      +id,
      updatePapelPermissaoTelaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.papelPermissaoTelaService.remove(+id);
  }
}
