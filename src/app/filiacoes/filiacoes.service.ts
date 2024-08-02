import { Injectable } from '@nestjs/common';
import { CreateFiliacaoDto } from './dto/create-filiacoe.dto';
import { Filiacao } from './entities/filiacao.entity';
import { FiliacaoRepository } from './repository/filiacao.repository';
import { UpdateFiliacoeDto } from './dto/update-filiacoe.dto';

@Injectable()
export class FiliacoesService {
  constructor(private readonly filiacaoRepository: FiliacaoRepository) {
  }

  async create(createFiliacaoDto: CreateFiliacaoDto): Promise<Filiacao> {
    return this.filiacaoRepository.create(createFiliacaoDto);
  }

  async findAll(): Promise<Filiacao[]> {
    return this.filiacaoRepository.findAll();
  }

  async findOne(id: number): Promise<Filiacao> {
    return this.filiacaoRepository.findOne(id);
  }

  async update(id: number, updateFiliacaoDto: UpdateFiliacoeDto): Promise<any> {
    await this.filiacaoRepository.update(+id, updateFiliacaoDto);
  }

  async remove(id: number): Promise<void> {
    return this.filiacaoRepository.remove(id);
  }
}
