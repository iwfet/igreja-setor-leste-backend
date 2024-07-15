import { PartialType } from '@nestjs/mapped-types';
import { CreateFamiliaDto } from './create-familia.dto';

export class UpdateFamiliaDto extends PartialType(CreateFamiliaDto) {}
