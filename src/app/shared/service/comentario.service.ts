import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comentario } from '../model/comentario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  urlBase : string = environment.urlBase.concat('/comentario')

  constructor(private http : HttpClient) {}

  salvar(comentarioDTO : Comentario) : Observable<Comentario>{
    return this.http.post<Comentario>(`${this.urlBase}`, comentarioDTO);
  }

  deletar(id : number): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${id}`)
  }

}
