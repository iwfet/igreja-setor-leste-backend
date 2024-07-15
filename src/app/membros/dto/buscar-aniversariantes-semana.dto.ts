import { Expose } from 'class-transformer';

export class BuscarAniversariantesSemana {
  @Expose() nome: string;
  @Expose() telefone: string;
  @Expose() celular: string;
  @Expose() membro_id: number;
}
