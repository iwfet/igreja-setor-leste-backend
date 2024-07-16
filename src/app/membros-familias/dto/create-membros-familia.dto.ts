import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateMembroFamiliaDto {
  @IsNotEmpty()
  @IsInt()
  membroId: number;

  @IsNotEmpty()
  @IsInt()
  familiaId: number;
}
