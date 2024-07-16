import { Module } from '@nestjs/common';
import { UsuarioPapelService } from './usuario-papel.service';
import { UsuarioPapelController } from './usuario-papel.controller';
import { usuarioPapelProvider } from './entities/usuario-papel.provider';

@Module({
  controllers: [UsuarioPapelController],
  providers: [UsuarioPapelService, ...usuarioPapelProvider],
})
export class UsuarioPapelModule {}
