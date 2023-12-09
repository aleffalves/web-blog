import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  constructor(@Inject(DIALOG_DATA) public data: any, public dialog: DialogRef) { }

  ngOnInit() {
  }

  close(close : boolean){
    this.dialog.close(close)
  }
}
