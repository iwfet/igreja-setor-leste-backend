import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MembrosFamiliasService } from './membros-familias.service';
import { CreateMembroFamiliaDto } from './dto/create-membros-familia.dto';
import { UpdateMembroFamiliaDto } from './dto/update-membros-familia.dto';

@Controller('membros-familias')
export class MembrosFamiliasController {
  constructor(
    private readonly membrosFamiliasService: MembrosFamiliasService,
  ) {}

  @Post()
  create(@Body() createMembroFamiliaDto: CreateMembroFamiliaDto) {
    return this.membrosFamiliasService.create(createMembroFamiliaDto);
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
  ) {
    return this.membrosFamiliasService.update(+id, updateMembroFamiliaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.membrosFamiliasService.remove(+id);
  }
}
