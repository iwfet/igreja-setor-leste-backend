import { Inject, Injectable } from '@nestjs/common';
import { USUARIO_REPOSITORY } from 'src/core/constants';
import { BaseRepository } from '../../../core/util/repository/base.repository';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioRepository extends BaseRepository<Usuario> {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly enderecoModel: typeof Usuario,
  ) {
    super(enderecoModel);
  }
}
