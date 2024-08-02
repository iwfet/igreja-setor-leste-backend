import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { PapelPermissaoTela } from '../../papel-permissao-tela/entities/papel-permisao-tela.entity';
import { EndpointTela } from '../../endpoint-telas/entities/endpoint-tela.entity';

@Table({ tableName: 'telas' })
export class Tela extends Model<Tela> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT, field: 'tela_id' })
  id: number;

  @Unique
  @Column({ allowNull: false, field: 'nome_tela' })
  nomeTela: string;

  @Unique
  @Column({ allowNull: false, field: 'path' })
  path: string;

  @Column({ allowNull: false, field: 'ativo', defaultValue: false })
  ativo: boolean;

  @Column({ allowNull: true })
  descricao: string;

  @HasMany(() => PapelPermissaoTela)
  permissoes: PapelPermissaoTela[];

  @HasMany(() => EndpointTela)
  endpoints: EndpointTela[];
}
