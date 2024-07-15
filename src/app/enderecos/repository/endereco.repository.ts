import { Inject, Injectable } from '@nestjs/common';
import { Endereco } from '../entities/endereco.entity';
import { ENDERECO_REPOSITORY } from 'src/core/constants';
import { BaseRepository } from '../../../core/util/repository/base.repository';

@Injectable()
export class EnderecoRepository extends BaseRepository<Endereco> {
  constructor(
    @Inject(ENDERECO_REPOSITORY)
    private readonly enderecoModel: typeof Endereco,
  ) {
    super(enderecoModel);
  }
}
