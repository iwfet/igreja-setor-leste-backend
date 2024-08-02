import { BuscarTelasUsuario } from '../../telas/dto/buscar-telas-usuario.dto';
import { BuscarTelasAtivasDto } from '../../telas/dto/buscarTelasAtivasDto';

export class Login {
  access_token: string;
  telasPermisao: BuscarTelasUsuario[] | BuscarTelasAtivasDto[];
  nomeUsuario: string;
}
