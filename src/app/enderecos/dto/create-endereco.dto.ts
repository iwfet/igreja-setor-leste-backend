import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEnderecoDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  rua: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  cidade: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  estado: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  bairro: string;

  @IsNotEmpty()
  @IsInt()
  codigoPostal: number;

  @IsNotEmpty()
  @IsInt()
  numero: number;

  @IsOptional()
  @IsString()
  complemento: string;
}
