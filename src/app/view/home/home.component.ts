import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { toDoc } from 'ngx-editor';
import { TipoPublicacao } from 'src/app/shared/enums/tipo-publicacao.enum';
import { ModalFormAlbumComponent } from 'src/app/shared/modais/modal-form-album/modal-form-album.component';
import { Post } from 'src/app/shared/model/post.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  readonly POST = TipoPublicacao.POST
  readonly ALBUM = TipoPublicacao.ALBUM

  post : Post = new Post() ;
  doc !: object;
  posts ?: Post[] = new Array()

  publicaoExibida : TipoPublicacao = TipoPublicacao.POST
  totalPages : number = 0;

  constructor(
    private _snackBar: MatSnackBar,
    private postService : PostService,
    public dialog : MatDialog,
    private authService : AuthService
  ) { }

  ngOnInit() {
    this.buscarPosts(0,5)
  }

  buscarPosts(page : number, limit : number){
    this.postService.buscarPosts(page, limit).subscribe({
      next : (posts) => {
        this.posts = posts.content
        this.totalPages = (posts.totalPages as number)-1
      }
    })
  }

  openSnackBar(mensagem : string, alerta : string, horizontalPosition ?: MatSnackBarHorizontalPosition , verticalPosition ?: MatSnackBarVerticalPosition   ) {
    this._snackBar.open(mensagem, alerta, {
      horizontalPosition : horizontalPosition ? horizontalPosition : 'center' as MatSnackBarHorizontalPosition ,
      verticalPosition: verticalPosition ? verticalPosition : 'bottom' as MatSnackBarVerticalPosition ,
    });
  }

  setMensagem(value : string){
    this.post.mensagem = value
  }

  cancelarPost(){
    this.post = new Post()
    this.doc = toDoc('')
  }

  salvarPost(){
    if(!this.post.titulo){
      return this.openSnackBar('Defina um titulo para o post.', 'OK')
    }

    this.postService.salvar(this.post).subscribe({
      next : (post) => {
        this.openSnackBar('Post salvo com sucesso.', 'OK')
        this.posts?.unshift(post)
        this.post = new Post()
        this.doc = toDoc('')
      }
    })

  }

  criarAlbum(){
    if(!this.authService.isLoggedIn()) return this.openSnackBar('Entre em sua conta ou cadastre-se.', 'ERRO')
    this.dialog.open(ModalFormAlbumComponent, {data : {}})
  }

}
