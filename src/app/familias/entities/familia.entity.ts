import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Endereco } from 'src/app/enderecos/entities/endereco.entity';
import { MembroFamilia } from 'src/app/membros-familias/entities/membros-familia.entity';

@Table({
  tableName: 'familias',
  // indexes: [
  //   {
  //     name: 'index_unique_nomefamiehendereso',
  //     fields: ['nome_familia', 'endereco_id'],
  //     unique: true,
  //   },
  // ],
})
export class Familia extends Model<Familia> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT, field: 'familia_id' })
  id: number;

  @Unique
  @Column({ field: 'nome_familia', type: DataType.STRING(100) })
  nomeFamilia: string;

  @Unique
  @ForeignKey(() => Endereco)
  @Column({ field: 'endereco_id' })
  enderecoId: number;

  @BelongsTo(() => Endereco)
  endereco: Endereco;

  @HasMany(() => MembroFamilia)
  membrosFamilia: MembroFamilia[];
}
