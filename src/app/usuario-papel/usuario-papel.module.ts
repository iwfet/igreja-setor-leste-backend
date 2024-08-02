import { Module } from '@nestjs/common';
import { UsuarioPapelService } from './usuario-papel.service';
import { UsuarioPapelController } from './usuario-papel.controller';
import { usuarioPapelProvider } from './entities/usuario-papel.provider';
import { UsuarioPapelRepository } from './repository/usuario-papel.repository';

@Module({
  controllers: [UsuarioPapelController],
  providers: [
    UsuarioPapelService,
    UsuarioPapelRepository,
    ...usuarioPapelProvider,
  ],
})
export class UsuarioPapelModule {
}
