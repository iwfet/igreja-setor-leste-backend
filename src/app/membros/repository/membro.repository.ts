import { Inject, Injectable } from '@nestjs/common';
import { MEMBRO_REPOSITORY } from 'src/core/constants';
import { BaseRepository } from '../../../core/util/repository/base.repository';
import { Membro } from '../entities/membro.entity';
import { QueryOptionsBuilder } from '../../../core/util/query/query-options-builder';

@Injectable()
export class MembroRepository extends BaseRepository<Membro> {
  constructor(
    @Inject(MEMBRO_REPOSITORY)
    private readonly membroModel: typeof Membro,
  ) {
    super(membroModel);
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

    return await this.executarQuery(build);
  }
}
