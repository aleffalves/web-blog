import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../model/post.model';
import { Observable } from 'rxjs';
import { Page } from '../model/page.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  urlBase : string = environment.urlBase.concat('/post')

  constructor(private http : HttpClient) { }

  salvar(post : Post) : Observable<Post>{
    return this.http.post<Post>(`${this.urlBase}`, post);
  }

  buscarPosts(page : number, limit : number) : Observable<Page>{
    let params = new HttpParams()
    params = params.append('page', page)
    params = params.append('limit', limit)
    return this.http.get<Page>(`${this.urlBase}`, {params : params})
  }

  deletar(id : number) : Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${id}`)
  }


}
