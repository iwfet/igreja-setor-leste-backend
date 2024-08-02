import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GlobalQueryRepository } from '../database/global-repositoy/global.repository';
import { PasswordService } from './password.service';
import { QueryOptionsBuilder } from '../database/query-options/query-options-builder';
import { Usuario } from '../../app/usuarios/entities/usuario.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly globalQueryRepository: GlobalQueryRepository,
    private readonly passwordService: PasswordService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid user credentials');
    }
    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const query = new QueryOptionsBuilder()
      .createNamedQuery('Usuario.findByEmail')
      .setTypeSelect()
      .setParameter('email', email)
      .build();

    const user = (
      await this.globalQueryRepository.executarQuery(query, null)
    )[0];

    if (
      user &&
      (await this.passwordService.checkPassword(password, user.senha))
    ) {
      return user;
    }
    throw new BadRequestException('Password/User does not match');
  }
}
