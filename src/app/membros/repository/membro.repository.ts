import { Inject, Injectable } from '@nestjs/common';
import { MEMBRO_REPOSITORY } from 'src/core/constants';
import { BaseRepository } from '../../../core/util/repository/base.repository';
import { Membro } from '../entities/membro.entity';

@Injectable()
export class MembroRepository extends BaseRepository<Membro> {
  constructor(
    @Inject(MEMBRO_REPOSITORY)
    private readonly membroModel: typeof Membro,
  ) {
    super(membroModel);
  }
}
