import { Component, Inject, OnInit } from '@angular/core';
import { Post } from '../../model/post.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Comentario } from '../../model/comentario.model';
import { ComentarioService } from '../../service/comentario.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from '../../service/auth.service';
import { DecodedToken } from '../../model/decoded-token.model';

@Component({
  selector: 'app-modal-post-detalhe',
  templateUrl: './modal-post-detalhe.component.html',
  styleUrls: ['./modal-post-detalhe.component.css']
})
export class ModalPostDetalheComponent implements OnInit {

  post ?: Post
  comentario : Comentario = new Comentario()
  usuarioLogado ?: DecodedToken

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<any>,
    private comentarioService : ComentarioService,
    private _snackBar: MatSnackBar,
    private authService : AuthService
  ) { }

  ngOnInit() {
    this.usuarioLogado = this.authService.getDecodedToken()
    this.post = this.data.post
  }

  salvar(){
    if(!this.comentario.mensagem) return this.openSnackBar('Adicione um comentário para envia-lo')
    if(!this.authService.isLoggedIn()) return this.openSnackBar('Entre em sua conta ou cadastre-se.')

    this.comentario.post = this.post!.id
    this.comentarioService.salvar(this.comentario).subscribe({
      next : (comentario) => {
        comentario.usuarioCriacao!.nome = this.usuarioLogado?.nome
        this.post?.comentarios?.push(comentario)
        this.comentario = new Comentario()
      }
    })
  }

  deletar(comentario : Comentario){
    this.comentarioService.deletar(comentario.id).subscribe({
      next : () =>  this.post?.comentarios?.splice(this.post.comentarios.findIndex(c => c == comentario), 1)
    })
  }

  openSnackBar(mensagem : string, horizontalPosition ?: MatSnackBarHorizontalPosition , verticalPosition ?: MatSnackBarVerticalPosition   ) {
    this._snackBar.open(mensagem, 'Atenção', {
      horizontalPosition : horizontalPosition ? horizontalPosition : 'center' as MatSnackBarHorizontalPosition ,
      verticalPosition: verticalPosition ? verticalPosition : 'bottom' as MatSnackBarVerticalPosition ,
    });
  }

}
