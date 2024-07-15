import { Inject, Injectable } from '@nestjs/common';
import { Familia } from '../entities/familia.entity';
import { FAMILIA_REPOSITORY } from 'src/core/constants';
import { BaseRepository } from '../../../core/util/repository/base.repository';

@Injectable()
export class FamiliaRepository extends BaseRepository<Familia> {
  constructor(
    @Inject(FAMILIA_REPOSITORY)
    private readonly familiaModel: typeof Familia,
  ) {
    super(familiaModel);
  }

  async findFamiliaByEnderecoId(enderecoId: number): Promise<Familia | null> {
    return this.familiaModel.findOne({ where: { enderecoId } });
  }
}
