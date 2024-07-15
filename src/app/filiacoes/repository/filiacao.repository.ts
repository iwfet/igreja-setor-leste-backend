import { Inject, Injectable } from '@nestjs/common';
import { FILIACAO_REPOSITORY } from 'src/core/constants';
import { BaseRepository } from '../../../core/util/repository/base.repository';
import { Filiacao } from '../entities/filiacao.entity';

@Injectable()
export class FiliacaoRepository extends BaseRepository<Filiacao> {
  constructor(
    @Inject(FILIACAO_REPOSITORY)
    private readonly membroModel: typeof Filiacao,
  ) {
    super(membroModel);
  }
}
