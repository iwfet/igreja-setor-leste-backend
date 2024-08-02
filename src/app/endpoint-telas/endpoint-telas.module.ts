import { Module } from '@nestjs/common';
import { EndpointTelasService } from './endpoint-telas.service';
import { endpointTelaProvider } from './entities/endpoint-tela.provider';
import { EndpointTelaRepository } from './repository/endpoint-telas.repository';

@Module({
  providers: [
    EndpointTelasService,
    EndpointTelaRepository,
    ...endpointTelaProvider,
  ],
  exports: [EndpointTelaRepository],
})
export class EndpointTelasModule {
}
