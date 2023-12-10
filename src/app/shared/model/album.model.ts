import { Imagem } from "./imagem.model"
import { Usuario } from "./usuario.model"

export class Album {
  id !: number
  nome ?: string
  usuarioCriacao ?: Usuario
  dataCriacao ?: Date
  imagens : Imagem[] = new Array()
}
