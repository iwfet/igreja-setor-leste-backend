import {Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Papel} from "../../papel/entities/papel.entity";
import {Tela} from "../../tela/entities/tela.entity";


@Table({tableName: 'papel_permissao_tela'})
export class PapelPermissaoTela extends Model<PapelPermissaoTela> {
    @ForeignKey(() => Papel)
    @Column({field: 'papel_id'})
    papelId: number;

    @BelongsTo(() => Papel)
    papel: Papel;

    @ForeignKey(() => Tela)
    @Column({field: 'tela_id'})
    telaId: number;

    @BelongsTo(() => Tela)
    tela: Tela;
}
