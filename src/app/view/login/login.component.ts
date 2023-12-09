import { PublicService } from './../../shared/service/public.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Login } from 'src/app/shared/model/login.model';
import { Token } from 'src/app/shared/model/token.model';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() onClose = new EventEmitter()

  mostrarSenha : boolean = false;
  login : Login = new Login()
  email ?: string;
  senha ?: string;

  usuario : Usuario = new Usuario()

  constructor(
    private authService : AuthService,
    private _snackBar: MatSnackBar,
    private publicService : PublicService
  ) { }

  ngOnInit() {
  }

  logar(){
    this.authService.logar(this.login).subscribe({
      next : (token) => {
        this.onClose.emit(true)
      }
    })
  }

  cadastrar(){
    if(!this.usuarioValido()) return
    this.publicService.salvarUsuario(this.usuario).subscribe({
      next : (usuario) => {
        this.usuario = usuario
        this.onClose.emit(true)
      }
    })
  }

  usuarioValido() : boolean{
    if(!this.usuario.nome){
      this.openSnackBar('Digite seu nome.')
      return false;
    }else if(!this.usuario.sobrenome){
      this.openSnackBar('Digite seu sobrenome.')
      return false;
    }else if(!this.usuario.email){
      this.openSnackBar('Digite seu melhor email.')
      return false;
    }else if(!this.usuario.senha){
      this.openSnackBar('Defina sua senha.')
      return false;
    }else if(this.usuario.senha && this.usuario.senha.length < 8){
     this.openSnackBar('Digite uma senha de no mínimo 8 dígitos')
      return false;
    }else{
      return true
    }
  }

  openSnackBar(mensagem : string, horizontalPosition ?: MatSnackBarHorizontalPosition , verticalPosition ?: MatSnackBarVerticalPosition   ) {
    this._snackBar.open(mensagem, 'OK', {
      horizontalPosition : horizontalPosition ? horizontalPosition : 'center' as MatSnackBarHorizontalPosition ,
      verticalPosition: verticalPosition ? verticalPosition : 'bottom' as MatSnackBarVerticalPosition ,
    });
  }

}
