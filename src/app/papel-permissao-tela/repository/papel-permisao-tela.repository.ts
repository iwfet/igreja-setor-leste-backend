import { Inject, Injectable, Scope } from '@nestjs/common';
import { PAPEL_PERMISAO_TELA_REPOSITORY } from 'src/core/constants';
import { PapelPermissaoTela } from '../entities/papel-permisao-tela.entity';
import { RequestScopeRepository } from '../../../core/database/repository/request-scope.repository';
import { CustomRequest } from '../../../core/custom/custom-request.interface';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class PapelPermisaoTelaRepository extends RequestScopeRepository<PapelPermissaoTela> {
  constructor(
    @Inject(PAPEL_PERMISAO_TELA_REPOSITORY)
    private readonly papelModel: typeof PapelPermissaoTela,
    @Inject(REQUEST) request: CustomRequest,
  ) {
    super(papelModel, request);
  }
}
