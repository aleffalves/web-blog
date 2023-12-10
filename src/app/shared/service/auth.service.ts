import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode } from "jwt-decode";
import { Token } from '../model/token.model';
import { Login } from '../model/login.model';
import { DecodedToken } from '../model/decoded-token.model';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlBase : string = environment.urlBase.concat('/auth')

  constructor(
    private http : HttpClient
  ) { }

  logar(login : Login) : Observable<Token>{
    return this.http.post<Token>(`${this.urlBase}/autenticar`, login)
  }

  salvarUsuario(usuarioDTO : Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>(`${this.urlBase}/cadastrar`, usuarioDTO)
  }

  getAuthToken() {
    return localStorage.getItem('token_blog');
  }

  logOut(){
    localStorage.removeItem('token_blog')
  }

  isLoggedIn() {
    if (this.getAuthToken()){
      return true
    }
    return false
  }

  getDecodedAccessToken(token: string): DecodedToken {
      return jwtDecode(token);
  }

  getDecodedToken(): DecodedToken {
    return jwtDecode(this.getAuthToken() as string);
  }

}
