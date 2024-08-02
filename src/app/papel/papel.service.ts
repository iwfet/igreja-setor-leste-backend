import { Injectable } from '@nestjs/common';
import { CreatePapelDto } from './dto/create-papel.dto';
import { Papel } from './entities/papel.entity';
import { PapelRepository } from './repository/papel.repository';

@Injectable()
export class PapelService {
  constructor(private readonly papelRepository: PapelRepository) {
  }

  async create(createPapelDto: CreatePapelDto): Promise<Papel> {
    return await this.papelRepository.create(createPapelDto);
  }

  async findAll(): Promise<Papel[]> {
    return await this.papelRepository.findAll();
  }

  async findOne(id: number): Promise<Papel> {
    return await this.papelRepository.findOne(id);
  }

  async update(
    id: number,
    updatePapelDto: Partial<CreatePapelDto>,
  ): Promise<any> {
    await this.papelRepository.update(+id, updatePapelDto);
  }

  async remove(id: number): Promise<void> {
    return this.papelRepository.remove(id);
  }
}
