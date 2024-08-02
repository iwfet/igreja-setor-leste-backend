import { Expose, Type } from 'class-transformer';

export class BuscarAniversariantesSemana {
  @Expose() nome: string;
  @Expose() telefone: string;
  @Expose() celular: string;
  @Expose()
  @Type(() => Number)
  membro_id: number;
}
