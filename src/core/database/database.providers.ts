import { databaseConfig } from './database.config';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE } from '../constants';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Endereco } from '../../app/enderecos/entities/endereco.entity';
import { Familia } from 'src/app/familias/entities/familia.entity';
import { Membro } from 'src/app/membros/entities/membro.entity';
import { MembroFamilia } from 'src/app/membros-familias/entities/membros-familia.entity';
import { Filiacao } from 'src/app/filiacoes/entities/filiacao.entity';
import { Papel } from 'src/app/papel/entities/papel.entity';
import { Tela } from 'src/app/tela/entities/tela.entity';
import { UsuarioPapel } from 'src/app/usuario-papel/entities/usuario-papel.entity';
import { Usuario } from 'src/app/usuarios/entities/usuario.entity';
import { ConfigService } from '@nestjs/config';
import { PapelPermissaoTela } from '../../app/papel-permissao-tela/entities/papel-permisao-tela.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async (configService: ConfigService) => {
      let config: SequelizeOptions;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development(configService);
          break;
        case PRODUCTION:
          config = databaseConfig.production(configService);
          break;
        default:
          config = databaseConfig.development(configService);
      }
      const sequelize = new Sequelize(config);

      sequelize.addModels([
        Endereco,
        Familia,
        Filiacao,
        Membro,
        MembroFamilia,
        Papel,
        PapelPermissaoTela,
        Tela,
        UsuarioPapel,
        Usuario,
      ]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
    inject: [ConfigService],
  },
];
