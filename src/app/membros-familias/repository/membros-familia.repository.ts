import { Inject, Injectable, Scope } from '@nestjs/common';
import { MEMBRO_FAMILIA_REPOSITORY } from 'src/core/constants';
import { MembroFamilia } from '../entities/membros-familia.entity';
import { CustomRequest } from '../../../core/custom/custom-request.interface';
import { REQUEST } from '@nestjs/core';
import { RequestScopeRepository } from '../../../core/database/repository/request-scope.repository';

@Injectable({ scope: Scope.REQUEST })
export class MembroFamiliaRepository extends RequestScopeRepository<MembroFamilia> {
  constructor(
    @Inject(MEMBRO_FAMILIA_REPOSITORY)
    private readonly membroModel: typeof MembroFamilia,
    @Inject(REQUEST) request: CustomRequest,
  ) {
    super(membroModel, request);
  }
}
