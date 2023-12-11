import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() texto ?: string
  @Input() iconePrefix ?: string
  @Input() icone ?: string
  @Input() iconeSize?: string
  @Input() classe ?: string
  @Input() color ?: string
  @Input() background ?: string
  @Input() width ?: string
  @Input() height ?: string
  @Input() fontSize ?: string
  @Input() fontWeight ?: string
  @Input() gap ?: string
  @Input() disabled : boolean = false;
  @Input() border ?: string;

  @Output() onClick = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}
