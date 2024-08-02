import { IsInt } from 'class-validator';

export class CreateUsuarioPapelDto {
  @IsInt()
  usuarioId: number;

  @IsInt()
  papelId: number;
}
