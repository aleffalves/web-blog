export class Token {
  email ?: string;
  autenticado ?: boolean;
  criacao ?: Date;
  expiracao ?: Date;
  accessToken !: string;
}
