import {
  AutoIncrement,
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Familia } from 'src/app/familias/entities/familia.entity';

@Table({ tableName: 'enderecos' })
export class Endereco extends Model<Endereco> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    field: 'endereco_id',
  })
  id: number;

  @Column({ field: 'rua', type: DataType.STRING(100) })
  rua: string;

  @Column({ field: 'cidade', type: DataType.STRING(50) })
  cidade: string;

  @Column({ field: 'bairro', type: DataType.STRING(50) })
  bairro: string;

  @Column({ field: 'estado', type: DataType.STRING(50) })
  estado: string;

  @Column({ field: 'codigo_postal', type: DataType.INTEGER })
  codigoPostal: number;

  @Column({ field: 'numero', type: DataType.INTEGER })
  numero: number;

  @Column({ field: 'complemento', type: DataType.STRING(50), allowNull: true })
  complemento: string;

  @Column({ field: 'latitude' })
  latitude: number;

  @Column({ field: 'longitude' })
  longitude: number;

  @HasOne(() => Familia)
  familia: Familia;
}
