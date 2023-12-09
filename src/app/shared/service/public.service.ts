import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  urlBase : string = environment.urlBase.concat('/public')

  constructor(private http : HttpClient) { }

  salvarUsuario(usuarioDTO : Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>(`${this.urlBase}/usuario`, usuarioDTO)
  }

}
