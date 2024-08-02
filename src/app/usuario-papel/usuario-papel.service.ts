import { Injectable } from '@nestjs/common';
import { CreateUsuarioPapelDto } from './dto/create-usuario-papel.dto';
import { UpdateUsuarioPapelDto } from './dto/update-usuario-papel.dto';
import { UsuarioPapelRepository } from './repository/usuario-papel.repository';
import { UsuarioPapel } from './entities/usuario-papel.entity';

@Injectable()
export class UsuarioPapelService {
  constructor(
    private readonly usuarioPapelRepository: UsuarioPapelRepository,
  ) {
  }

  async create(
    createUsuarioPapelDto: CreateUsuarioPapelDto,
  ): Promise<UsuarioPapel> {
    return await this.usuarioPapelRepository.create(createUsuarioPapelDto);
  }

  async findAll(): Promise<UsuarioPapel[]> {
    return await this.usuarioPapelRepository.findAll();
  }

  async findOne(id: number): Promise<UsuarioPapel> {
    return await this.usuarioPapelRepository.findOne(id);
  }

  async update(
    id: number,
    updateUsuarioPapelDto: UpdateUsuarioPapelDto,
  ): Promise<any> {
    await this.usuarioPapelRepository.update(+id, updateUsuarioPapelDto);
  }

  async remove(id: number): Promise<void> {
    return this.usuarioPapelRepository.remove(id);
  }
}
