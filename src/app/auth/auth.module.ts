import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from '../usuarios/usuarios.module';

import { JwtStrategy } from '../../core/security/jwt.strategy';
import { PasswordService } from 'src/core/security/password.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from 'src/core/security/local.strategy';
import { GlobalQueryNativaModule } from '../../core/database/global-repositoy/global.module';

@Module({
  imports: [
    GlobalQueryNativaModule,
    UsuariosModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(
            configService.getOrThrow<string>(
              'ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC',
            ),
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, PasswordService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
