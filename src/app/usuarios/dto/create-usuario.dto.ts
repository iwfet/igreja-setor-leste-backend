import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsNumber()
  membroId: number;

  @IsString()
  @IsOptional()
  nomeUsuario: string;

  @IsString()
  senha: string;

  @IsEmail()
  email: string;
}
