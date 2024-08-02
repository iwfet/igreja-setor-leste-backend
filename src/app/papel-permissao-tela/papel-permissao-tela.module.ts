import { Module } from '@nestjs/common';
import { PapelPermissaoTelaService } from './papel-permissao-tela.service';
import { PapelPermissaoTelaController } from './papel-permissao-tela.controller';
import { papelPermisaoTelaProvider } from './entities/papel-permisao-tela.provider';
import { PapelPermisaoTelaRepository } from './repository/papel-permisao-tela.repository';

@Module({
  controllers: [PapelPermissaoTelaController],
  providers: [
    PapelPermissaoTelaService,
    PapelPermisaoTelaRepository,
    ...papelPermisaoTelaProvider,
  ],
})
export class PapelPermissaoTelaModule {
}
