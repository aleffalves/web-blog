import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  urlBase : string = environment.urlBase.concat('/comentario')

  constructor(private http : HttpClient) { }

}
