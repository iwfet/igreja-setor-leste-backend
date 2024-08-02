import { IsInt } from 'class-validator';

export class CreatePapelPermissaoTelaDto {
  @IsInt()
  papelId: number;

  @IsInt()
  telaId: number;
}
