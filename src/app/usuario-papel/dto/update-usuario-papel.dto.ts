import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioPapelDto } from './create-usuario-papel.dto';

export class UpdateUsuarioPapelDto extends PartialType(CreateUsuarioPapelDto) {
}
