import { Inject, Injectable, Scope } from '@nestjs/common';
import { Familia } from '../entities/familia.entity';
import { FAMILIA_REPOSITORY } from 'src/core/constants';
import { CustomRequest } from '../../../core/custom/custom-request.interface';
import { REQUEST } from '@nestjs/core';
import { RequestScopeRepository } from '../../../core/database/repository/request-scope.repository';

@Injectable({ scope: Scope.REQUEST })
export class FamiliaRepository extends RequestScopeRepository<Familia> {
  constructor(
    @Inject(FAMILIA_REPOSITORY)
    private readonly familiaModel: typeof Familia,
    @Inject(REQUEST) request: CustomRequest,
  ) {
    super(familiaModel, request);
  }

  async findFamiliaByEnderecoId(enderecoId: number): Promise<Familia | null> {
    return this.familiaModel.findOne({ where: { enderecoId } });
  }
}
