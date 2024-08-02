import { Injectable } from '@nestjs/common';
import { CreateTelaDto } from './dto/create-tela.dto';
import { UpdateTelaDto } from './dto/update-tela.dto';
import { TelaRepository } from './repository/tela.repository';
import { Tela } from './entities/tela.entity';
import { BuscarTelasUsuario } from './dto/buscar-telas-usuario.dto';
import { QueryOptionsBuilder } from '../../core/database/query-options/query-options-builder';
import { BuscarTelasAtivasDto } from './dto/buscarTelasAtivasDto';

@Injectable()
export class TelaService {
  constructor(private readonly telaRepository: TelaRepository) {
  }

  async create(createTelaDto: CreateTelaDto): Promise<Tela> {
    return await this.telaRepository.create(createTelaDto);
  }

  async findAll(): Promise<Tela[]> {
    return await this.telaRepository.findAll();
  }

  async findOne(id: number): Promise<Tela> {
    return await this.telaRepository.findOne(id);
  }

  async update(id: number, updateTelaDto: UpdateTelaDto): Promise<any> {
    await this.telaRepository.update(+id, updateTelaDto);
  }

  async remove(id: number): Promise<void> {
    return this.telaRepository.remove(id);
  }

  async buscarTelasUsuario(userId: number): Promise<BuscarTelasUsuario[]> {
    const query = new QueryOptionsBuilder()
      .createNamedQuery('Telas.buscarTelasUsuario')
      .setTypeSelect()
      .setParameter('id', userId)
      .build();

    return await this.telaRepository.executarQuery<BuscarTelasUsuario>(
      query,
      BuscarTelasUsuario,
    );
  }

  async buscarTelasAtivas() {
    const query = new QueryOptionsBuilder()
      .createNamedQuery('Telas.buscarTelasAtivas')
      .setTypeSelect()
      .build();

    return await this.telaRepository.executarQuery<BuscarTelasAtivasDto>(
      query,
      BuscarTelasAtivasDto,
    );
  }
}
