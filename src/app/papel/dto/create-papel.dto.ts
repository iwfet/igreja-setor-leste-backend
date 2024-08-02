import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePapelDto {
  @IsString()
  @MaxLength(50)
  nomePapel: string;

  @IsOptional()
  @IsString()
  @MaxLength(254)
  descricao?: string;
}
