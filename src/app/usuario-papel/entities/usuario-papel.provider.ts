import { UsuarioPapel } from './usuario-papel.entity';
import { USUARIO_PAPEL_REPOSITORY } from '../../../core/constants';

export const usuarioPapelProvider = [
  {
    provide: USUARIO_PAPEL_REPOSITORY,
    useValue: UsuarioPapel,
  },
];
