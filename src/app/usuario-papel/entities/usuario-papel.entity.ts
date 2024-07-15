import {
  Table,
  Column,
  Model,
  ForeignKey,
  Index,
  BelongsTo,
} from 'sequelize-typescript';
import { Papel } from 'src/app/papel/entities/papel.entity';
import { Usuario } from 'src/app/usuarios/entities/usuario.entity';

@Table({
  tableName: 'usuario_papel',
  indexes: [
    {
      name: 'index_unique_usuario_papel_1',
      fields: ['usuario_id', 'papel_id'],
      unique: true,
    },
  ],
})
export class UsuarioPapel extends Model<UsuarioPapel> {
  @ForeignKey(() => Usuario)
  @Index('index_unique_usuario_papel_1')
  @Column({ field: 'usuario_id', allowNull: false })
  usuarioId: number;

  @ForeignKey(() => Papel)
  @Index('index_unique_usuario_papel_1')
  @Column({ field: 'papel_id', allowNull: false })
  papelId: number;
}
