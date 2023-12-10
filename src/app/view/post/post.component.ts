import { Page } from './../../shared/model/page.model';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from 'src/app/shared/modais/modal-confirmacao/modal-confirmacao.component';
import { ModalPostDetalheComponent } from 'src/app/shared/modais/modal-post-detalhe/modal-post-detalhe.component';
import { Post } from 'src/app/shared/model/post.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() posts ?: Post[] = new Array()
  @Input() totalPages : number = 0;

  idUsuarioLogado ?: number
  page : number = 0;
  limit : number = 5;

  constructor(
    private postService : PostService,
    public dialog : MatDialog,
    private authService : AuthService
  ) { }

  ngOnInit() {
    this.idUsuarioLogado = this.authService.getDecodedToken().id
  }

  buscarPosts(page : number, limit : number){
    this.postService.buscarPosts(page, limit).subscribe({
      next : (posts) => {
        posts.content?.forEach(p => this.posts?.push(p))
        this.page = posts.number as number
        this.limit = posts.size as number
        this.totalPages = (posts.totalPages as number)-1
      }
    })
  }

  deletarPost(post : Post){
    let modal = this.dialog.open(ModalConfirmacaoComponent, {data : {}})
    modal.afterClosed().subscribe({
      next : (res) => {
        if(res){
          this.postService.deletar(post.id).subscribe({})
          this.posts?.splice(this.posts?.findIndex( p => p = post), 1)
        }
      }
    })
  }

  verMais(){
    this.buscarPosts(this.page+1, this.limit)
  }

  onClick(post : Post){
    this.dialog.open(ModalPostDetalheComponent, {
      data : { post : post}
    })
  }

}
