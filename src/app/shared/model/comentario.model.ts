import { Usuario } from "./usuario.model";

export class Comentario {
  id !: number;
  post !: number;
  mensagem ?: string;
  usuarioCriacao ?: Usuario
  dataCriacao ?: Date
}
