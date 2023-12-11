import { Comentario } from "./comentario.model";
import { Usuario } from "./usuario.model";

export class Post{
  id !: number
  titulo ?: string
  mensagem ?: string
  usuarioCriacao ?: Usuario
  dataCriacao ?: Date
  comentarios ?: Comentario[] = new Array()
}
