import {PartialType} from '@nestjs/mapped-types';
import {CreateMembroFamiliaDto,} from './create-membros-familia.dto';

export class UpdateMembroFamiliaDto extends PartialType(CreateMembroFamiliaDto) {
}
