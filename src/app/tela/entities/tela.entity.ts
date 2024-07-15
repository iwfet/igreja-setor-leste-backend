import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    HasMany, DataType, Unique,
} from 'sequelize-typescript';
import {PapelPermissaoTela} from "../../papel-permissao-tela/entities/papel-permisao-tela.entity";

@Table({tableName: 'telas'})
export class Tela extends Model<Tela> {
    @PrimaryKey
    @AutoIncrement
    @Column({type: DataType.BIGINT, field: 'tela_id'})
    id: number;

    @Unique
    @Column({allowNull: false, field: 'nome_tela'})
    nomeTela: string;

    @Column({allowNull: true})
    descricao: string;

    @HasMany(() => PapelPermissaoTela)
    permissoes: PapelPermissaoTela[];

}
