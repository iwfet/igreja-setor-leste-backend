import { Module } from '@nestjs/common';
import { TelaService } from './tela.service';
import { TelaController } from './tela.controller';
import { telaProvider } from './entities/tela.provider';
import { TelaRepository } from './repository/tela.repository';

@Module({
  controllers: [TelaController],
  providers: [TelaService, TelaRepository, ...telaProvider],
  exports: [TelaService],
})
export class TelaModule {
}
