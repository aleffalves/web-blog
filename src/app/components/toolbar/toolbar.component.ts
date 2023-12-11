import { Usuario } from 'src/app/shared/model/usuario.model';
import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ModalLoginComponent } from 'src/app/shared/modais/modal-login/modal-login.component';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  usuario : string = ''

  constructor(
    private authService : AuthService,
    public dialog: Dialog
  ) { }

  ngOnInit() {
  }

  estaLogado() : boolean{
    if(this.authService.isLoggedIn()){
      this.usuario = this.authService.getDecodedToken().nome as string
      return true
    }else{
      return false
    }
  }

  openLogin(){
    let modal = this.dialog.open(ModalLoginComponent, { data : {}})
  }

  logout(){
    this.authService.logOut()
    location.reload()
  }

}
