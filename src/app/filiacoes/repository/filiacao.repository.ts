import { Inject, Injectable, Scope } from '@nestjs/common';
import { FILIACAO_REPOSITORY } from 'src/core/constants';
import { Filiacao } from '../entities/filiacao.entity';
import { REQUEST } from '@nestjs/core';
import { CustomRequest } from '../../../core/custom/custom-request.interface';
import { RequestScopeRepository } from '../../../core/database/repository/request-scope.repository';

@Injectable({ scope: Scope.REQUEST })
export class FiliacaoRepository extends RequestScopeRepository<Filiacao> {
  constructor(
    @Inject(FILIACAO_REPOSITORY)
    private readonly membroModel: typeof Filiacao,
    @Inject(REQUEST) request: CustomRequest,
  ) {
    super(membroModel, request);
  }
}
