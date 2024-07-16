import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Membro } from 'src/app/membros/entities/membro.entity';

@Table({ tableName: 'filiacoes' })
export class Filiacao extends Model<Filiacao> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'filiacao_id',
  })
  id: number;

  @Unique
  @ForeignKey(() => Membro)
  @Column({ field: 'membro_id' })
  membroId: number;

  @BelongsTo(() => Membro)
  membro: Membro;

  @Column({ field: 'nome_pai', type: DataType.STRING(100) })
  nomePai: string;

  @Column({ field: 'nome_mae', type: DataType.STRING(100) })
  nomeMae: string;
}
