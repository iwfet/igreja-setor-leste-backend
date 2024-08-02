import { Injectable } from '@nestjs/common';
import { Endereco } from './entities/endereco.entity';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { EnderecoRepository } from './repository/endereco.repository';

@Injectable()
export class EnderecosService {
  constructor(private readonly enderecoRepository: EnderecoRepository) {
  }

  async create(createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
    return this.enderecoRepository.create(createEnderecoDto);
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
  ): Promise<void> {
    return this.enderecoRepository.update(id, updateEnderecoDto);
  }

  async remove(id: number): Promise<void> {
    return this.enderecoRepository.remove(id);
  }
}
