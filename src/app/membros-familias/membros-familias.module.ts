import {Module} from '@nestjs/common';
import {MembrosFamiliasService} from './membros-familias.service';
import {MembrosFamiliasController} from './membros-familias.controller';
import {MembroFamiliaRepository} from "./repositories/membros-familia.repository";
import {membroFamiliaProvider} from "./entities/membros-familia.provider";
import {MembrosModule} from "../membros/membros.module";

@Module({
    imports: [MembrosModule],
    controllers: [MembrosFamiliasController],
    providers: [MembrosFamiliasService, MembroFamiliaRepository, ...membroFamiliaProvider],
})
export class MembrosFamiliasModule {
}
