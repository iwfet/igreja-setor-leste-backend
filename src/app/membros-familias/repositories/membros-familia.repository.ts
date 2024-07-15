import { Inject, Injectable } from '@nestjs/common';
import { MEMBRO_FAMILIA_REPOSITORY } from 'src/core/constants';
import { BaseRepository } from '../../../core/util/repository/base.repository';
import { MembroFamilia } from '../entities/membros-familia.entity';

@Injectable()
export class MembroFamiliaRepository extends BaseRepository<MembroFamilia> {
  constructor(
    @Inject(MEMBRO_FAMILIA_REPOSITORY)
    private readonly membroModel: typeof MembroFamilia,
  ) {
    super(membroModel);
  }
}
