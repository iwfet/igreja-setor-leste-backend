import { PartialType } from '@nestjs/mapped-types';
import { CreatePapelPermissaoTelaDto } from './create-papel-permissao-tela.dto';

export class UpdatePapelPermissaoTelaDto extends PartialType(
  CreatePapelPermissaoTelaDto,
) {}
