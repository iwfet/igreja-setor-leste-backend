import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FamiliasService } from './familias.service';
import { CreateFamiliaDto } from './dto/create-familia.dto';

@Controller('familias')
export class FamiliasController {
  constructor(private readonly familiasService: FamiliasService) {
  }

  @Post()
  create(@Body() createFamiliaDto: CreateFamiliaDto) {
    return this.familiasService.create(createFamiliaDto);
  }

  @Get()
  findAll() {
    return this.familiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familiasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateFamiliaDto: Partial<CreateFamiliaDto>,
  ) {
    return this.familiasService.update(+id, updateFamiliaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.familiasService.remove(id);
  }
}
