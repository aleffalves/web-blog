import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toDoc } from 'ngx-editor';
import { Post } from 'src/app/shared/model/post.model';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.css']
})
export class CardPostComponent implements OnInit {

  @Input() post ?: Post
  @Input() idUsuarioLogado ?: number
  @Output() deletarPostEmit = new EventEmitter()
  @Output() onClickEmit = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  getDoc(){
    return toDoc(this.post?.mensagem as string)
  }

  deletar(){
    this.deletarPostEmit.emit(this.post)
  }

  onClick(){
    this.onClickEmit.emit(this.post)
  }

}
