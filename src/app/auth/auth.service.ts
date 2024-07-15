import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { PasswordService } from 'src/core/security/password.service';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: Usuario = await this.usuariosService.findByEmail(email);
    if (
      user &&
      (await this.passwordService.checkPassword(password, user.senha))
    ) {
      const { ...result } = user['dataValues'];
      return result;
    }
    throw new BadRequestException('Password/User does not match');
  }

  async login(user: any): Promise<{ access_token: string; telas: any[] }> {
    console.log('login');
    const payload = {
      nomeUsuario: user.nomeUsuario,
      usuarioId: user.id,
      admin: user.admin,
    };
    const telas = [];
    // const telas = await this.usuarioTelaService.buscaPorTelasIdUser(user.id);
    // await this.userService.saveToken(user.id, token);

    return {
      access_token: this.jwtService.sign(payload),
      telas,
    };
  }
}
