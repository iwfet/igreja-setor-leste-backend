import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CustomRequest } from '../../core/custom/custom-request.interface';
import { Transaction } from 'sequelize';
import { AdminGuard } from '../../core/guards/check-admin.guard';

@UseGuards(AdminGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @Req() request: CustomRequest,
  ) {
    const transaction: Transaction = request.transaction;
    return this.usuariosService.create(createUsuarioDto, transaction);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Req() request: CustomRequest,
  ) {
    const transaction: Transaction = request.transaction;
    return this.usuariosService.update(+id, updateUsuarioDto, transaction);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: CustomRequest) {
    const transaction: Transaction = request.transaction;
    return this.usuariosService.remove(+id, transaction);
  }
}
