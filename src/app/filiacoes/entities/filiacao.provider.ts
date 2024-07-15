import { FILIACAO_REPOSITORY } from 'src/core/constants';
import { Filiacao } from './filiacao.entity';

export const filiacaoProvider = [
  {
    provide: FILIACAO_REPOSITORY,
    useValue: Filiacao,
  },
];
