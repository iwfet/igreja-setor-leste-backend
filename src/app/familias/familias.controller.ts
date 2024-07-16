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
import { FamiliasService } from './familias.service';
import { CreateFamiliaDto } from './dto/create-familia.dto';
import { Public } from 'src/core/decorator/public.decorator';
import { CustomRequest } from 'src/core/custom/custom-request.interface';
import { Transaction } from 'sequelize';

@Public()
@Controller('familias')
export class FamiliasController {
  constructor(private readonly familiasService: FamiliasService) {}

  @Post()
  create(
    @Body() createFamiliaDto: CreateFamiliaDto,
    @Req() request: CustomRequest,
  ) {
    const transaction: Transaction = request.transaction;
    return this.familiasService.create(createFamiliaDto, transaction);
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
    @Req() request: CustomRequest,
  ) {
    const transaction: Transaction = request.transaction;
    return this.familiasService.update(+id, updateFamiliaDto, transaction);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() request: CustomRequest) {
    const transaction: Transaction = request.transaction;
    return this.familiasService.remove(id, transaction);
  }
}
