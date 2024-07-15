import { Injectable } from '@nestjs/common';
import { CreateTelaDto } from './dto/create-tela.dto';
import { UpdateTelaDto } from './dto/update-tela.dto';

@Injectable()
export class TelaService {
  create(createTelaDto: CreateTelaDto) {
    return 'This action adds a new tela';
  }

  findAll() {
    return `This action returns all tela`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tela`;
  }

  update(id: number, updateTelaDto: UpdateTelaDto) {
    return `This action updates a #${id} tela`;
  }

  remove(id: number) {
    return `This action removes a #${id} tela`;
  }
}
