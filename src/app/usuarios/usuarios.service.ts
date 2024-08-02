import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioRepository } from './repository/usuario.repository';
import { Usuario } from './entities/usuario.entity';
import { PasswordService } from '../../core/security/password.service';
import { TelaService } from '../telas/tela.service';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly passwordService: PasswordService,
    private readonly telaService: TelaService,
  ) {
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    createUsuarioDto.senha = await this.passwordService.encryptPassword(
      createUsuarioDto.senha,
    );
    return this.usuarioRepository.create(createUsuarioDto);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }

  async findOne(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne(id);
  }

  async update(id: number, updateEnderecoDto: UpdateUsuarioDto): Promise<void> {
    return this.usuarioRepository.update(id, updateEnderecoDto);
  }

  async remove(id: number): Promise<void> {
    return this.usuarioRepository.remove(id);
  }

  async findByEmail(email: string): Promise<Usuario> {
    return this.usuarioRepository.findOneByField('email', email);
  }

  async buscarInformacoesProprioUser(usuarioId: number) {
    const usuario = await this.findOne(usuarioId);
    const telasPermisao = usuario.admin
      ? await this.telaService.buscarTelasAtivas()
      : await this.telaService.buscarTelasUsuario(usuarioId);

    return {
      telasPermisao,
      nomeUsuario: usuario.nomeUsuario,
    };
  }
}
