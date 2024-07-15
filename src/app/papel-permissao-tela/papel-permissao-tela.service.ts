import { Injectable } from '@nestjs/common';
import { CreatePapelPermissaoTelaDto } from './dto/create-papel-permissao-tela.dto';
import { UpdatePapelPermissaoTelaDto } from './dto/update-papel-permissao-tela.dto';

@Injectable()
export class PapelPermissaoTelaService {
  create(createPapelPermissaoTelaDto: CreatePapelPermissaoTelaDto) {
    return 'This action adds a new papelPermissaoTela';
  }

  findAll() {
    return `This action returns all papelPermissaoTela`;
  }

  findOne(id: number) {
    return `This action returns a #${id} papelPermissaoTela`;
  }

  update(id: number, updatePapelPermissaoTelaDto: UpdatePapelPermissaoTelaDto) {
    return `This action updates a #${id} papelPermissaoTela`;
  }

  remove(id: number) {
    return `This action removes a #${id} papelPermissaoTela`;
  }
}
