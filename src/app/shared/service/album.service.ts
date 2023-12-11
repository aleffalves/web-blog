import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from '../model/album.model';
import { Page } from '../model/page.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  urlBase : string = environment.urlBase.concat('/album')

  constructor(private http : HttpClient) { }

  salvar(album : Album) : Observable<void>{
    return this.http.post<void>(`${this.urlBase}`, album)
  }

  buscarAlbuns(page : number, limit : number) : Observable<Page>{
    let params = new HttpParams()
    params = params.append('page', page)
    params = params.append('limit', limit)
    return this.http.get<Page>(`${this.urlBase}`, {params : params})
  }

  deletar(id : number) : Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${id}`)
  }

}
