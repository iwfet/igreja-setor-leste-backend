import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { usuarioProvider } from './entities/usuario.provider';
import { UsuarioRepository } from './repository/usuario.repository';
import { PasswordService } from '../../core/security/password.service';
import { TelaModule } from '../telas/tela.module';

@Module({
  imports: [TelaModule],
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    UsuarioRepository,
    ...usuarioProvider,
    PasswordService,
  ],
  exports: [UsuariosService],
})
export class UsuariosModule {
}
