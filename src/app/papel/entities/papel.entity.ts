import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { UsuarioPapel } from 'src/app/usuario-papel/entities/usuario-papel.entity';
import { PapelPermissaoTela } from '../../papel-permissao-tela/entities/papel-permisao-tela.entity';

@Table({ tableName: 'papeis' })
export class Papel extends Model<Papel> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT, field: 'papel_id' })
  id: number;

  @Unique
  @Column({ type: DataType.STRING(50), allowNull: false, field: 'nome_papel' })
  nomePapel: string;

  @Column({ type: DataType.STRING(254), allowNull: true })
  descricao: string;

  @HasMany(() => PapelPermissaoTela)
  papelPermissaoTela: PapelPermissaoTela[];

  @HasMany(() => UsuarioPapel)
  usuarioPapel: UsuarioPapel[];
}
