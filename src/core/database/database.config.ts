import { ConfigService } from '@nestjs/config';
import { SequelizeOptions } from 'sequelize-typescript';

export const databaseConfig = {
  development: (configService: ConfigService): SequelizeOptions => ({
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASS'),
    database: configService.get<string>('DB_NAME'),
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT'), 10),
    dialect: configService.get<any>('DB_DIALECT'),
    logging: true,
  }),
  production: (configService: ConfigService): SequelizeOptions => ({
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASS'),
    database: configService.get<string>('DB_NAME'),
    host: configService.get<string>('DB_HOST'),
    dialect: configService.get<any>('DB_DIALECT'),
    logging: false,
  }),
};
