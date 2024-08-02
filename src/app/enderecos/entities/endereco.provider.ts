import { ENDERECO_REPOSITORY } from 'src/core/constants';
import { Endereco } from './endereco.entity';

export const enderecoProvider = [
  {
    provide: ENDERECO_REPOSITORY,
    useValue: Endereco,
  },
];
