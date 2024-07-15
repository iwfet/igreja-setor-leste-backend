import { MEMBRO_REPOSITORY } from 'src/core/constants';
import { Membro } from './membro.entity';

export const membroProvider = [
  {
    provide: MEMBRO_REPOSITORY,
    useValue: Membro,
  },
];
