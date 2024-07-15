import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  DataType,
  BelongsTo,
  ForeignKey,
  Unique,
  BelongsToMany,
} from 'sequelize-typescript';
import { UsuarioPapel } from 'src/app/usuario-papel/entities/usuario-papel.entity';
import { Membro } from '../../membros/entities/membro.entity';
import { Papel } from '../../papel/entities/papel.entity';

@Table({ tableName: 'usuarios' })
export class Usuario extends Model<Usuario> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT, field: 'usuario_id' })
  id: number;

  @Unique
  @ForeignKey(() => Membro)
  @Column({ field: 'membro_id', allowNull: false })
  membroId: number;

  @BelongsTo(() => Membro, { onDelete: 'CASCADE' })
  membro: Membro;

  @Column({
    field: 'nome_usuario',
    type: DataType.STRING(100),
    allowNull: true,
  })
  nomeUsuario: string;

  @Column({ field: 'senha', type: DataType.STRING, allowNull: false })
  senha: string;

  @Unique
  @Column({ field: 'email', type: DataType.STRING(100), allowNull: false })
  email: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  ativo: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  admin: boolean;

  @HasMany(() => UsuarioPapel)
  usuarioPapel: UsuarioPapel[];
}
