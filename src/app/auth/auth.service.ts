import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Login } from './dto/login.dto';
import { QueryOptionsBuilder } from '../../core/database/query-options/query-options-builder';
import { BuscarTelasAtivasDto } from '../telas/dto/buscarTelasAtivasDto';
import { GlobalQueryRepository } from '../../core/database/global-repositoy/global.repository';
import { BuscarTelasUsuario } from '../telas/dto/buscar-telas-usuario.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly globalQueryRepository: GlobalQueryRepository,
  ) {}

  async login(user: any): Promise<Login> {
    const telasPermisao = user.admin
      ? await this.buscarTelasAtivas()
      : await this.buscarTelasUsuario(+user.usuario_id);

    const payload = {
      usuarioId: +user.usuario_id,
      admin: user.admin,
    };
    return {
      access_token: this.jwtService.sign(payload),
      telasPermisao,
      nomeUsuario: user.nomeUsuario,
    };
  }

  private async buscarTelasAtivas() {
    const query = new QueryOptionsBuilder()
      .createNamedQuery('Telas.buscarTelasAtivas')
      .setTypeSelect()
      .build();

    return await this.globalQueryRepository.executarQuery<BuscarTelasAtivasDto>(
      query,
      null,
      BuscarTelasAtivasDto,
    );
  }

  private async buscarTelasUsuario(id) {
    const query = new QueryOptionsBuilder()
      .createNamedQuery('Telas.buscarTelasUsuario')
      .setTypeSelect()
      .setParameter('id', id)
      .build();

    return await this.globalQueryRepository.executarQuery<BuscarTelasUsuario>(
      query,
      null,
      BuscarTelasUsuario,
    );
  }
}
