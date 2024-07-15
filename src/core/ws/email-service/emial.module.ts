import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import EmailService from "./emial.service";


@Module({
    imports: [ConfigModule],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule {
}
