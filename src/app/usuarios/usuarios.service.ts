import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioRepository } from './repository/usuario.repository';
import { Transaction } from 'sequelize';
import { Usuario } from './entities/usuario.entity';
import { PasswordService } from '../../core/security/password.service';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async create(
    createUsuarioDto: CreateUsuarioDto,
    transaction: Transaction,
  ): Promise<Usuario> {
    createUsuarioDto.senha = await this.passwordService.encryptPassword(
      createUsuarioDto.senha,
    );
    return this.usuarioRepository.create(createUsuarioDto, transaction);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }

  async findOne(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne(id);
  }

  async update(
    id: number,
    updateEnderecoDto: UpdateUsuarioDto,
    transaction: Transaction,
  ): Promise<void> {
    return this.usuarioRepository.update(id, updateEnderecoDto, transaction);
  }

  async remove(id: number, transaction: Transaction): Promise<void> {
    return this.usuarioRepository.remove(id, transaction);
  }

  async findByEmail(email: string): Promise<Usuario> {
    return this.usuarioRepository.findOneByField('email', email);
  }
}
