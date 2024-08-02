import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GlobalQueryRepository } from '../database/global-repositoy/global.repository';
import { QueryOptionsBuilder } from '../database/query-options/query-options-builder';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private globalQueryRepository: GlobalQueryRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    await this.checkUsuaioExiste(payload);
    return payload;
  }

  private async checkUsuaioExiste(payload: any): Promise<void> {
    const query = new QueryOptionsBuilder()
      .createNamedQuery('Usuario.findOneBYid')
      .setTypeSelect()
      .setParameter('id', payload.usuarioId)
      .build();

    const user = (
      await this.globalQueryRepository.executarQuery(query, null)
    )[0];
    if (!user) {
      throw new UnauthorizedException(
        'You are not authorized to perform the operation',
      );
    }

    payload.admin = user.admin;
  }
}
