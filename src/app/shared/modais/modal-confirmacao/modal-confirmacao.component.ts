import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.css']
})
export class ModalConfirmacaoComponent implements OnInit {

  titulo : string = 'Tem certeza que deseja realizar esta ação?'
  mensagem : string | null = null

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialogRef<any>) { }

  ngOnInit() {
  }

  salvar(podeSalvar : boolean){
    this.dialog.close(podeSalvar)
  }

}
