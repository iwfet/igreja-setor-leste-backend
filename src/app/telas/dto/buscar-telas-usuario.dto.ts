import { PartialType } from '@nestjs/mapped-types';
import { BuscarTelasAtivasDto } from './buscarTelasAtivasDto';

export class BuscarTelasUsuario extends PartialType(BuscarTelasAtivasDto) {
}
