import { Expose, Type } from 'class-transformer';

export class BuscarTelasAtivasDto {
  @Expose()
  @Type(() => Number)
  tela_id: number;
  @Expose() nome_tela: string;
  @Expose() descricao: string;
  @Expose() path: string;
}
