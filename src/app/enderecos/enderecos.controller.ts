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
import { EnderecosService } from './enderecos.service';
import { CustomRequest } from 'src/core/custom/custom-request.interface';
import { Transaction } from 'sequelize';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { Public } from 'src/core/decorator/public.decorator';

@Public()
@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Post()
  create(@Body() endereco: CreateEnderecoDto, @Req() request: CustomRequest) {
    const transaction: Transaction = request.transaction;
    return this.enderecosService.create(endereco, transaction);
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
  update(
    @Param('id') id: number,
    @Body() endereco: UpdateEnderecoDto,
    @Req() request: CustomRequest,
  ) {
    const transaction: Transaction = request.transaction;
    return this.enderecosService.update(id, endereco, transaction);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() request: CustomRequest) {
    const transaction: Transaction = request.transaction;
    return this.enderecosService.remove(id, transaction);
  }
}
