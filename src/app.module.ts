/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';

import {DatabaseModule} from './core/database/database.module';
import {EnderecosModule} from './app/enderecos/enderecos.module';
import {APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core';
import {TransactionInterceptor} from './core/interceptor/transaction.interceptor';
import {FamiliasModule} from './app/familias/familias.module';
import {MembrosModule} from './app/membros/membros.module';
import {FiliacoesModule} from './app/filiacoes/filiacoes.module';
import {MembrosFamiliasModule} from './app/membros-familias/membros-familias.module';
import {UsuariosModule} from './app/usuarios/usuarios.module';
import {PapelModule} from './app/papel/papel.module';
import {UsuarioPapelModule} from './app/usuario-papel/usuario-papel.module';
import {TelaModule} from './app/tela/tela.module';
import {AuthModule} from './app/auth/auth.module';
import {JwtAuthGuard} from './core/guards/jwt-auth.guard';
import {JwtStrategy} from './core/security/jwt.strategy';
import {ConfigModule} from '@nestjs/config';
import {PapelPermissaoTelaModule} from './app/papel-permissao-tela/papel-permissao-tela.module';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        DatabaseModule,
        EnderecosModule,
        FamiliasModule,
        MembrosModule,
        FiliacoesModule,
        MembrosFamiliasModule,
        UsuariosModule,
        PapelModule,
        UsuarioPapelModule,
        TelaModule,
        AuthModule,
        PapelPermissaoTelaModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: TransactionInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        JwtStrategy,
    ],
})
export class AppModule {
}
