import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsuarioPapelService } from './usuario-papel.service';
import { CreateUsuarioPapelDto } from './dto/create-usuario-papel.dto';
import { UpdateUsuarioPapelDto } from './dto/update-usuario-papel.dto';

@Controller('usuario-papel')
export class UsuarioPapelController {
  constructor(private readonly usuarioPapelService: UsuarioPapelService) {}

  @Post()
  create(@Body() createUsuarioPapelDto: CreateUsuarioPapelDto) {
    return this.usuarioPapelService.create(createUsuarioPapelDto);
  }

  @Get()
  findAll() {
    return this.usuarioPapelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioPapelService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsuarioPapelDto: UpdateUsuarioPapelDto,
  ) {
    return this.usuarioPapelService.update(+id, updateUsuarioPapelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioPapelService.remove(+id);
  }
}
