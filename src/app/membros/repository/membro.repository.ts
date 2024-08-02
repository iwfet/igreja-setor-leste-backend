import { Inject, Injectable, Scope } from '@nestjs/common';
import { MEMBRO_REPOSITORY } from 'src/core/constants';
import { Membro } from '../entities/membro.entity';
import { QueryOptionsBuilder } from '../../../core/database/query-options/query-options-builder';
import { BuscarAniversariantesSemana } from '../dto/buscar-aniversariantes-semana.dto';
import { RequestScopeRepository } from '../../../core/database/repository/request-scope.repository';
import { REQUEST } from '@nestjs/core';
import { CustomRequest } from '../../../core/custom/custom-request.interface';

@Injectable({ scope: Scope.REQUEST })
export class MembroRepository extends RequestScopeRepository<Membro> {
  constructor(
    @Inject(MEMBRO_REPOSITORY)
      membroModel: typeof Membro,
    @Inject(REQUEST) request: CustomRequest,
  ) {
    super(membroModel, request);
  }

  async buscarAniversariantesSemana(
    domingo: Date,
    sabado: Date,
  ): Promise<Membro> {
    const build = new QueryOptionsBuilder()
      .createNamedQuery('Membros.buscarAniversariantesSemana')
      .setTypeSelect()
      .setParameter('domingo', domingo)
      .setParameter('sabado', sabado)
      .build();

    return await this.executarQuery<BuscarAniversariantesSemana>(
      build,
      BuscarAniversariantesSemana,
    );
  }
}
