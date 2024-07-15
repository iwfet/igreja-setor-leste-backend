import { Injectable } from '@nestjs/common';
import { CreatePapelDto } from './dto/create-papel.dto';
import { UpdatePapelDto } from './dto/update-papel.dto';

@Injectable()
export class PapelService {
  create(createPapelDto: CreatePapelDto) {
    return 'This action adds a new papel';
  }

  findAll() {
    return `This action returns all papel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} papel`;
  }

  update(id: number, updatePapelDto: UpdatePapelDto) {
    return `This action updates a #${id} papel`;
  }

  remove(id: number) {
    return `This action removes a #${id} papel`;
  }
}
