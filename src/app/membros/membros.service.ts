import { Injectable } from '@nestjs/common';
import { CreateMembroDto } from './dto/create-membro.dto';
import { Membro } from './entities/membro.entity';
import { Transaction } from 'sequelize';
import { MembroRepository } from './repository/membro.repository';
import { QueryOptionsBuilder } from '../../core/util/query/query-options-builder';

@Injectable()
export class MembrosService {
  constructor(private readonly membroRepository: MembroRepository) {}

  async create(
    createMembroDto: CreateMembroDto,
    transaction: Transaction,
  ): Promise<Membro> {
    return await this.membroRepository.create(createMembroDto, transaction);
  }

  async findAll(): Promise<Membro[]> {
    const build = new QueryOptionsBuilder()
      .createNamedQuery('ConsultaSimples.teste')
      .setTypeSelect()
      .build();
    return await this.membroRepository.executarQuery(build);
  }

  async findOne(id: number): Promise<Membro> {
    // const build = new QueryOptionsBuilder()
    //   .createNamedQuery('ConsultaSimples.teste2')
    //   .setParameter('id', id)
    //   .setTypeSelect()
    //   .build();
    // return await this.membroRepository.executarQuery(build);

    return await this.membroRepository.findOne(id);
  }

  async update(
    id: number,
    updateMembroDto: Partial<CreateMembroDto>,
    transaction: Transaction,
  ): Promise<any> {
    await this.membroRepository.update(+id, updateMembroDto, transaction);
  }

  async remove(id: number, transaction: Transaction): Promise<void> {
    return this.membroRepository.remove(id, transaction);
  }
}
