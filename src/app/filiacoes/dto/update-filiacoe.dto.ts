import { PartialType } from '@nestjs/mapped-types';
import { CreateFiliacaoDto } from './create-filiacoe.dto';

export class UpdateFiliacoeDto extends PartialType(CreateFiliacaoDto) {}
