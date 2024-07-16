import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { EstadoCivil } from 'src/core/enum/estado-civil';
import { Sexo } from 'src/core/enum/sexo';

export class CreateMembroDto {
  @IsString()
  @MaxLength(100)
  nome: string;

  @IsEnum(Sexo)
  sexo: Sexo;

  @IsDateString()
  dataNascimento: Date;

  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @IsString()
  @MaxLength(20)
  telefone: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  celular?: string;

  @IsDateString()
  dataIngresso: Date;

  @IsOptional()
  @IsDateString()
  dataBatismo?: Date;

  @IsEnum(EstadoCivil)
  estadoCivil: EstadoCivil;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  ocupacao?: string;

  @IsBoolean()
  ativo: boolean;

  @IsBoolean()
  comungante: boolean;

  @IsOptional()
  @IsInt()
  conjugueId?: number;
}
