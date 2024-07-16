import { Module } from '@nestjs/common';
import { FamiliasService } from './familias.service';
import { FamiliasController } from './familias.controller';
import { familiaProvider } from './entities/familia.provider';
import { FamiliaRepository } from './repository/familia.repository';

@Module({
  // imports: [EnderecosModule],
  controllers: [FamiliasController],
  providers: [FamiliasService, ...familiaProvider, FamiliaRepository],
})
export class FamiliasModule {}
