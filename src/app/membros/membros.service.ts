import { Injectable } from '@nestjs/common';
import { CreateMembroDto } from './dto/create-membro.dto';
import { Membro } from './entities/membro.entity';
import { MembroRepository } from './repository/membro.repository';
import { QueryOptionsBuilder } from '../../core/database/query-options/query-options-builder';

@Injectable()
export class MembrosService {
  constructor(private readonly membroRepository: MembroRepository) {}

  async create(createMembroDto: CreateMembroDto): Promise<Membro> {
    return await this.membroRepository.create(createMembroDto);
  }

  async findAll(): Promise<Membro[]> {
    return await this.membroRepository.findAll();
  }

  async findOne(id: number): Promise<Membro> {
    return await this.membroRepository.findOne(id);
  }

  async update(
    id: number,
    updateMembroDto: Partial<CreateMembroDto>,
  ): Promise<any> {
    await this.membroRepository.update(+id, updateMembroDto);
  }

  async remove(id: number): Promise<void> {
    return this.membroRepository.remove(id);
  }
}
