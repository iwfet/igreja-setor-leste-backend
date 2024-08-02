import { BelongsTo, Column, DataType, ForeignKey, Index, Model, Table } from 'sequelize-typescript';
import { Familia } from 'src/app/familias/entities/familia.entity';
import { Membro } from 'src/app/membros/entities/membro.entity';

@Table({
  tableName: 'membros_familia',
  indexes: [
    {
      name: 'index_unique_membros_familia_1',
      fields: ['membro_id', 'familia_id'],
      unique: true,
    },
  ],
})
export class MembroFamilia extends Model<MembroFamilia> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'membro_familia_id',
  })
  id: number;

  @Index('index_unique_membros_familia_1')
  @ForeignKey(() => Membro)
  @Column({ field: 'membro_id', allowNull: false })
  membroId: number;

  @BelongsTo(() => Membro)
  membro: Membro;

  @Index('index_unique_membros_familia_1')
  @ForeignKey(() => Familia)
  @Column({ field: 'familia_id', allowNull: false })
  familiaId: number;

  @BelongsTo(() => Familia)
  familia: Familia;
}
