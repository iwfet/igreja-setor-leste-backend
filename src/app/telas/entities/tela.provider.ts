import { TELA_REPOSITORY } from '../../../core/constants';
import { Tela } from './tela.entity';

export const telaProvider = [
  {
    provide: TELA_REPOSITORY,
    useValue: Tela,
  },
];
