import { PapelPermissaoTela } from './papel-permisao-tela.entity';
import { PAPEL_PERMISAO_TELA_REPOSITORY } from '../../../core/constants';

export const papelPermisaoTelaProvider = [
  {
    provide: PAPEL_PERMISAO_TELA_REPOSITORY,
    useValue: PapelPermissaoTela,
  },
];
