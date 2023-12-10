import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Editor, Toolbar, toDoc, toHTML } from 'ngx-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {
  @Input() titulo ?: string
  @Output() valueChange = new EventEmitter<string>();

  @Input() doc !: object
  editor !: Editor;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(){}

  ngOnInit(): void {
    this.editor = new Editor();
  }

  onChange(doc: object) {
    this.valueChange.emit(toHTML(doc));
  }

  cancelar(){
   this.doc = toDoc('')
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
