import {Module} from '@nestjs/common';
import {FiliacoesService} from './filiacoes.service';
import {FiliacoesController} from './filiacoes.controller';
import {filiacaoProvider} from './entities/filiacao.provider';
import {FiliacaoRepository} from "./repository/filiacao.repository";

@Module({
    controllers: [FiliacoesController],
    providers: [FiliacoesService, FiliacaoRepository, ...filiacaoProvider],
})
export class FiliacoesModule {
}
