import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { toDoc } from 'ngx-editor';
import { Post } from 'src/app/shared/model/post.model';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  post : Post = new Post() ;
  doc !: object;

  constructor(
    private _snackBar: MatSnackBar,
    private postService : PostService
  ) { }

  ngOnInit() {
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
        this.post = new Post()
        this.doc = toDoc('')
      }
    })

  }

}
