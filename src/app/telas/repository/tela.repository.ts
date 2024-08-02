import { Inject, Injectable, Scope } from '@nestjs/common';
import { TELA_REPOSITORY } from 'src/core/constants';
import { Tela } from '../entities/tela.entity';
import { RequestScopeRepository } from '../../../core/database/repository/request-scope.repository';
import { CustomRequest } from '../../../core/custom/custom-request.interface';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class TelaRepository extends RequestScopeRepository<Tela> {
  constructor(
    @Inject(TELA_REPOSITORY)
    private readonly telaModel: typeof Tela,
    @Inject(REQUEST) request: CustomRequest,
  ) {
    super(telaModel, request);
  }
}
