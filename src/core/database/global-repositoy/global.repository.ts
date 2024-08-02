import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from '../repository/base.repository';

import { QueryOptions } from '../query-options/query-options';
import { Transaction } from 'sequelize';
import { ENDERECO_REPOSITORY } from '../../constants';
import { Endereco } from '../../../app/enderecos/entities/endereco.entity';

@Injectable()
export class GlobalQueryRepository extends BaseRepository<Endereco> {
  constructor(@Inject(ENDERECO_REPOSITORY) entity: typeof Endereco) {
    super(entity);
  }

  async executarQuery<M>(
    queryOptions: QueryOptions,
    transaction: Transaction,
    ResultType?: {
      new (): M;
    },
  ): Promise<any> {
    return super.executarQuery(queryOptions, transaction, ResultType);
  }
}
