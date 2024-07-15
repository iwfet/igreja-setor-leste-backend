import { PartialType } from '@nestjs/mapped-types';
import { CreateTelaDto } from './create-tela.dto';

export class UpdateTelaDto extends PartialType(CreateTelaDto) {}
