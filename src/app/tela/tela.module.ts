import {Module} from '@nestjs/common';
import {TelaService} from './tela.service';
import {TelaController} from './tela.controller';
import {telaProvider} from "./entities/tela.provider";

@Module({
    controllers: [TelaController],
    providers: [TelaService, ...telaProvider],
})
export class TelaModule {
}
