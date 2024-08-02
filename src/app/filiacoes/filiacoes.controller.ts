import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FiliacoesService } from './filiacoes.service';
import { CreateFiliacaoDto } from './dto/create-filiacoe.dto';

@Controller('filiacoes')
export class FiliacoesController {
  constructor(private readonly filiacoesService: FiliacoesService) {}

  @Post()
  create(@Body() createFiliacaoDto: CreateFiliacaoDto) {
    return this.filiacoesService.create(createFiliacaoDto);
  }

  @Get()
  findAll() {
    return this.filiacoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filiacoesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFiliacoeDto: Partial<CreateFiliacaoDto>,
  ) {
    return this.filiacoesService.update(+id, updateFiliacoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.filiacoesService.remove(+id);
  }
}
