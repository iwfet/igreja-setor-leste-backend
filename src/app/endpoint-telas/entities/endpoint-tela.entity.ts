import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Tela } from 'src/app/telas/entities/tela.entity';

@Table({ tableName: 'endpoint_telas' })
export class EndpointTela extends Model<EndpointTela> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    field: 'endpoint_tela_id',
  })
  id: number;

  @Column({ field: 'endpoint', type: DataType.STRING, allowNull: false })
  endpoint: string;

  @ForeignKey(() => Tela)
  @Column({ field: 'tela_id', type: DataType.BIGINT })
  telaId: number;
}
