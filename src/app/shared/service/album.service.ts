import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from '../model/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  urlBase : string = environment.urlBase.concat('/album')

  constructor(private http : HttpClient) { }

  salvar(album : Album) : Observable<void>{
    return this.http.post<void>(`${this.urlBase}`, album)
  }

}
