import { Inject, Injectable, Scope } from '@nestjs/common';
import { Endereco } from '../entities/endereco.entity';
import { ENDERECO_REPOSITORY } from 'src/core/constants';
import { RequestScopeRepository } from '../../../core/database/repository/request-scope.repository';
import { REQUEST } from '@nestjs/core';
import { CustomRequest } from '../../../core/custom/custom-request.interface';

@Injectable({ scope: Scope.REQUEST })
export class EnderecoRepository extends RequestScopeRepository<Endereco> {
  constructor(
    @Inject(ENDERECO_REPOSITORY)
    private readonly enderecoModel: typeof Endereco,
    @Inject(REQUEST) request: CustomRequest,
  ) {
    super(enderecoModel, request);
  }
}
