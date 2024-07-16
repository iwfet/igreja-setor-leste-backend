import { Module } from '@nestjs/common';
import { PapelPermissaoTelaService } from './papel-permissao-tela.service';
import { PapelPermissaoTelaController } from './papel-permissao-tela.controller';
import { papelPermisaoTelaProvider } from './entities/papel-permisao-tela.provider';

@Module({
  controllers: [PapelPermissaoTelaController],
  providers: [PapelPermissaoTelaService, ...papelPermisaoTelaProvider],
})
export class PapelPermissaoTelaModule {}
