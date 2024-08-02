import { Injectable } from '@nestjs/common';
import { EndpointTelaRepository } from './repository/endpoint-telas.repository';

@Injectable()
export class EndpointTelasService {
  constructor(
    private readonly endpointTelaRepository: EndpointTelaRepository,
  ) {
  }
}
