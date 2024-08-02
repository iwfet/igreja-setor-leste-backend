import { EndpointTela } from './endpoint-tela.entity';
import { ENDPOINT_TELA_REPOSITORY } from '../../../core/constants';

export const endpointTelaProvider = [
  {
    provide: ENDPOINT_TELA_REPOSITORY,
    useValue: EndpointTela,
  },
];
