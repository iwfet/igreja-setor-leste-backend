import { Inject, Injectable, Scope } from '@nestjs/common';
import { ENDPOINT_TELA_REPOSITORY } from 'src/core/constants';
import { EndpointTela } from '../entities/endpoint-tela.entity';
import { RequestScopeRepository } from '../../../core/database/repository/request-scope.repository';
import { REQUEST } from '@nestjs/core';
import { CustomRequest } from '../../../core/custom/custom-request.interface';

@Injectable({ scope: Scope.REQUEST })
export class EndpointTelaRepository extends RequestScopeRepository<EndpointTela> {
  constructor(
    @Inject(ENDPOINT_TELA_REPOSITORY)
    private readonly endpointTelaModel: typeof EndpointTela,
    @Inject(REQUEST) request: CustomRequest,
  ) {
    super(endpointTelaModel, request);
  }
}
