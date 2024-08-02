import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTelaDto {
  @IsString()
  @MaxLength(50)
  nomeTela: string;

  @IsString()
  @MaxLength(250)
  path: string;

  @IsBoolean()
  ativo?: boolean;

  @IsOptional()
  @IsString()
  descricao?: string;
}
