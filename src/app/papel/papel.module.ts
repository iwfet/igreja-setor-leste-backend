import { Module } from '@nestjs/common';
import { PapelService } from './papel.service';
import { PapelController } from './papel.controller';
import { papelProvider } from './entities/papel.provider';
import { PapelRepository } from './repository/papel.repository';

@Module({
  controllers: [PapelController],
  providers: [PapelService, PapelRepository, ...papelProvider],
})
export class PapelModule {
}
