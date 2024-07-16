import { Injectable } from '@nestjs/common';
import { Endereco } from './entities/endereco.entity';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { Transaction } from 'sequelize';
import { EnderecoRepository } from './repository/endereco.repository';

@Injectable()
export class EnderecosService {
  constructor(private readonly enderecoRepository: EnderecoRepository) {}

  async create(
    createEnderecoDto: CreateEnderecoDto,
    transaction: Transaction,
  ): Promise<Endereco> {
    return this.enderecoRepository.create(createEnderecoDto, transaction);
  }

  async findAll(): Promise<Endereco[]> {
    return this.enderecoRepository.findAll();
  }

  async findOne(id: number): Promise<Endereco> {
    return this.enderecoRepository.findOne(id);
  }

  async update(
    id: number,
    updateEnderecoDto: UpdateEnderecoDto,
    transaction: Transaction,
  ): Promise<void> {
    return this.enderecoRepository.update(id, updateEnderecoDto, transaction);
  }

  async remove(id: number, transaction: Transaction): Promise<void> {
    return this.enderecoRepository.remove(id, transaction);
  }
}
