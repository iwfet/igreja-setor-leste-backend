import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFamiliaDto } from './dto/create-familia.dto';
import { Familia } from './entities/familia.entity';
import { FamiliaRepository } from './repository/familia.repository';

@Injectable()
export class FamiliasService {
  constructor(private readonly familiaRepository: FamiliaRepository) {
  }

  async create(createFamiliaDto: CreateFamiliaDto): Promise<Familia> {
    await this.verificaSeEnderecoVinculadoFamilia(createFamiliaDto.enderecoId);
    return this.familiaRepository.create(createFamiliaDto);
  }

  async findAll(): Promise<Familia[]> {
    return this.familiaRepository.findAll();
  }

  async findOne(id: number): Promise<Familia> {
    return this.familiaRepository.findOne(id);
  }

  async update(
    id: number,
    updateFamiliaDto: Partial<CreateFamiliaDto>,
  ): Promise<any> {
    await this.verificaSeEnderecoVinculadoFamilia(
      updateFamiliaDto.enderecoId,
      +id,
    );
    return this.familiaRepository.update(+id, updateFamiliaDto);
  }

  async remove(id: number): Promise<void> {
    return this.familiaRepository.remove(id);
  }

  private async verificaSeEnderecoVinculadoFamilia(
    enderecoId: number,
    idFamilia?: number,
  ): Promise<void> {
    const existingFamily =
      await this.familiaRepository.findFamiliaByEnderecoId(enderecoId);
    if (existingFamily && idFamilia !== existingFamily.id) {
      throw new ConflictException('Endereço já está vinculado a outra família');
    }
  }
}
