import {
  Table,
  Column,
  Model,
  HasMany,
  Unique,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Filiacao } from 'src/app/filiacoes/entities/filiacao.entity';
import { MembroFamilia } from 'src/app/membros-familias/entities/membros-familia.entity';
import { Sexo } from '../../../core/enum/sexo';
import { EstadoCivil } from '../../../core/enum/estado-civil';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Table({ tableName: 'membros' })
export class Membro extends Model<Membro> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'membro_id',
  })
  id: number;

  @Unique
  @Column({ field: 'nome', type: DataType.STRING(100), allowNull: false })
  nome: string;

  @Column({
    field: 'sexo',
    type: DataType.ENUM(...Object.values(Sexo)),
    allowNull: false,
  })
  sexo: Sexo;

  @Column({ field: 'data_nascimento', type: DataType.DATE, allowNull: false })
  dataNascimento: Date;

  @Column({ field: 'email', type: DataType.STRING(100), allowNull: true })
  email: string;

  @Column({ field: 'telefone', type: DataType.STRING(20), allowNull: false })
  telefone: string;

  @Column({ field: 'celular', type: DataType.STRING(20), allowNull: true })
  celular: string;

  @Column({ field: 'data_ingresso', type: DataType.DATE, allowNull: true })
  dataIngresso: Date;

  @Column({ field: 'data_batismo', type: DataType.DATE, allowNull: true })
  dataBatismo: Date;

  @Column({
    field: 'estado_civil',
    type: DataType.ENUM(...Object.values(EstadoCivil)),
    allowNull: false,
  })
  estadoCivil: EstadoCivil;

  @Column({ field: 'ocupacao', type: DataType.STRING(100), allowNull: true })
  ocupacao: string;

  @Column({
    field: 'ativo',
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  ativo: boolean;

  @Column({
    field: 'comungante',
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  comungante: boolean;

  @ForeignKey(() => Membro)
  @Column({ field: 'conjugue_id', type: DataType.INTEGER, allowNull: true })
  conjugueId: number;

  @BelongsTo(() => Membro, { as: 'conjugue' })
  conjugue: Membro;

  @HasMany(() => MembroFamilia)
  membrosFamilia: MembroFamilia[];

  @HasMany(() => Filiacao)
  filiacoes: Filiacao[];

  @HasMany(() => Usuario, { onDelete: 'CASCADE' })
  usuarios: Usuario[];
}
