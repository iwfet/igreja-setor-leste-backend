import {Module} from '@nestjs/common';
import {PapelService} from './papel.service';
import {PapelController} from './papel.controller';
import {papelProvider} from "./entities/papel.provider";

@Module({
    controllers: [PapelController],
    providers: [PapelService, ...papelProvider],
})
export class PapelModule {
}
