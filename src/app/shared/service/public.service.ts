import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario.model';
import { Observable } from 'rxjs';
import { Page } from '../model/page.model';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  urlBase : string = environment.urlBase.concat('/public')

  constructor(private http : HttpClient) { }

  salvarUsuario(usuarioDTO : Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>(`${this.urlBase}/usuario`, usuarioDTO)
  }

  buscarPosts(page : number, limit : number) : Observable<Page>{
    let params = new HttpParams()
    params = params.append('page', page)
    params = params.append('limit', limit)
    return this.http.get<Page>(`${this.urlBase}/post`, {params : params})
  }

}
