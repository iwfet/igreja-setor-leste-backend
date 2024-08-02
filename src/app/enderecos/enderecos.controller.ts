import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Post()
  create(@Body() endereco: CreateEnderecoDto) {
    return this.enderecosService.create(endereco);
  }

  @Get()
  findAll() {
    return this.enderecosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.enderecosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() endereco: UpdateEnderecoDto) {
    return this.enderecosService.update(id, endereco);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.enderecosService.remove(id);
  }
}
