import { Module } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';
import { enderecoProvider } from 'src/app/enderecos/entities/endereco.provider';
import { EnderecoRepository } from './repository/endereco.repository';

@Module({
  controllers: [EnderecosController],
  providers: [EnderecosService, EnderecoRepository, ...enderecoProvider],
  exports: [EnderecosService],
})
export class EnderecosModule {
}
