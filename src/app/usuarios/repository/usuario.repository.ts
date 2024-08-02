import { Inject, Injectable, Scope } from '@nestjs/common';
import { USUARIO_REPOSITORY } from 'src/core/constants';
import { Usuario } from '../entities/usuario.entity';
import { RequestScopeRepository } from '../../../core/database/repository/request-scope.repository';
import { CustomRequest } from '../../../core/custom/custom-request.interface';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class UsuarioRepository extends RequestScopeRepository<Usuario> {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly enderecoModel: typeof Usuario,
    @Inject(REQUEST) request: CustomRequest,
  ) {
    super(enderecoModel, request);
  }

  async buscarInformacoesProprioUser(usuarioId: number) {
  }
}
