import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PapelService } from './papel.service';
import { CreatePapelDto } from './dto/create-papel.dto';
import { UpdatePapelDto } from './dto/update-papel.dto';

@Controller('papel')
export class PapelController {
  constructor(private readonly papelService: PapelService) {}

  @Post()
  create(@Body() createPapelDto: CreatePapelDto) {
    return this.papelService.create(createPapelDto);
  }

  @Get()
  findAll() {
    return this.papelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.papelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePapelDto: UpdatePapelDto) {
    return this.papelService.update(+id, updatePapelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.papelService.remove(+id);
  }
}
