import { Inject, Injectable, Scope } from '@nestjs/common';
import { PAPEL_REPOSITORY } from 'src/core/constants';
import { Papel } from '../entities/papel.entity';
import { RequestScopeRepository } from '../../../core/database/repository/request-scope.repository';
import { REQUEST } from '@nestjs/core';
import { CustomRequest } from '../../../core/custom/custom-request.interface';

@Injectable({ scope: Scope.REQUEST })
export class PapelRepository extends RequestScopeRepository<Papel> {
  constructor(
    @Inject(PAPEL_REPOSITORY)
    private readonly papelModel: typeof Papel,
    @Inject(REQUEST) request: CustomRequest,
  ) {
    super(papelModel, request);
  }
}
