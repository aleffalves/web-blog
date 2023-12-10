import { Usuario } from "./usuario.model"

export class Imagem {
  id !: number
  album !: number
  nome ?: string
  extensao ?: string
  byteImagem ?: string
}
