import { Module } from '@nestjs/common';
import { MembrosService } from './membros.service';
import { MembrosController } from './membros.controller';
import { membroProvider } from './entities/membro.provider';
import { MembroRepository } from './repository/membro.repository';

@Module({
  controllers: [MembrosController],
  providers: [MembrosService, MembroRepository, ...membroProvider],
  exports: [MembrosService],
})
export class MembrosModule {}
