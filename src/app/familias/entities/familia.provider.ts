import { FAMILIA_REPOSITORY } from 'src/core/constants';
import { Familia } from './familia.entity';

export const familiaProvider = [
  {
    provide: FAMILIA_REPOSITORY,
    useValue: Familia,
  },
];
