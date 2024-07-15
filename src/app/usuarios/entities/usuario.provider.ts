import { USUARIO_REPOSITORY } from 'src/core/constants';
import { Usuario } from './usuario.entity';

export const usuarioProvider = [
  {
    provide: USUARIO_REPOSITORY,
    useValue: Usuario,
  },
];
