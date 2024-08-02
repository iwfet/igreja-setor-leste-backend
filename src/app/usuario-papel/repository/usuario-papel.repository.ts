import { Inject, Injectable, Scope } from '@nestjs/common';
import { USUARIO_PAPEL_REPOSITORY } from 'src/core/constants';
import { UsuarioPapel } from '../entities/usuario-papel.entity';
import { CustomRequest } from '../../../core/custom/custom-request.interface';
import { REQUEST } from '@nestjs/core';
import { RequestScopeRepository } from '../../../core/database/repository/request-scope.repository';

@Injectable({ scope: Scope.REQUEST })
export class UsuarioPapelRepository extends RequestScopeRepository<UsuarioPapel> {
  constructor(
    @Inject(USUARIO_PAPEL_REPOSITORY)
    private readonly usuarioPapelModel: typeof UsuarioPapel,
    @Inject(REQUEST) request: CustomRequest,
  ) {
    super(usuarioPapelModel, request);
  }
}
