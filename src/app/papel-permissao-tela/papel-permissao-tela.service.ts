import { Injectable } from '@nestjs/common';
import { CreatePapelPermissaoTelaDto } from './dto/create-papel-permissao-tela.dto';
import { UpdatePapelPermissaoTelaDto } from './dto/update-papel-permissao-tela.dto';
import { PapelPermisaoTelaRepository } from './repository/papel-permisao-tela.repository';
import { PapelPermissaoTela } from './entities/papel-permisao-tela.entity';

@Injectable()
export class PapelPermissaoTelaService {
  constructor(
    private readonly papelPermisaoTelaRepository: PapelPermisaoTelaRepository,
  ) {
  }

  async create(
    createPapelPermissaoTelaDto: CreatePapelPermissaoTelaDto,
  ): Promise<PapelPermissaoTela> {
    return await this.papelPermisaoTelaRepository.create(
      createPapelPermissaoTelaDto,
    );
  }

  async findAll(): Promise<PapelPermissaoTela[]> {
    return await this.papelPermisaoTelaRepository.findAll();
  }

  async findOne(id: number): Promise<PapelPermissaoTela> {
    return await this.papelPermisaoTelaRepository.findOne(id);
  }

  async update(
    id: number,
    updatePapelPermissaoTelaDto: UpdatePapelPermissaoTelaDto,
  ): Promise<any> {
    await this.papelPermisaoTelaRepository.update(
      +id,
      updatePapelPermissaoTelaDto,
    );
  }

  async remove(id: number): Promise<void> {
    return this.papelPermisaoTelaRepository.remove(id);
  }
}
