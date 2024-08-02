import { Module } from '@nestjs/common';
import { GlobalQueryRepository } from './global.repository';
import { enderecoProvider } from '../../../app/enderecos/entities/endereco.provider';

@Module({
  providers: [GlobalQueryRepository, ...enderecoProvider],
  exports: [GlobalQueryRepository],
})
export class GlobalQueryNativaModule {}
