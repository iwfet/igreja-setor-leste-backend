import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreateFamiliaDto {
  @IsString()
  @MaxLength(100)
  nomeFamilia: string;

  @IsInt()
  enderecoId: number;
}
