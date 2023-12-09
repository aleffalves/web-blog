import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../model/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  urlBase : string = environment.urlBase.concat('/post')

  constructor(private http : HttpClient) { }

  salvar(post : Post) : Observable<Post>{
    return this.http.post<Post>(`${this.urlBase}`, post);
  }

}
