import { Injectable } from '@nestjs/common';
import { CreateUsuarioPapelDto } from './dto/create-usuario-papel.dto';
import { UpdateUsuarioPapelDto } from './dto/update-usuario-papel.dto';

@Injectable()
export class UsuarioPapelService {
  create(createUsuarioPapelDto: CreateUsuarioPapelDto) {
    return 'This action adds a new usuarioPapel';
  }

  findAll() {
    return `This action returns all usuarioPapel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioPapel`;
  }

  update(id: number, updateUsuarioPapelDto: UpdateUsuarioPapelDto) {
    return `This action updates a #${id} usuarioPapel`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioPapel`;
  }
}
