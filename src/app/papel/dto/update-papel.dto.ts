import { PartialType } from '@nestjs/mapped-types';
import { CreatePapelDto } from './create-papel.dto';

export class UpdatePapelDto extends PartialType(CreatePapelDto) {}
