import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  template: '{{format}}'
})
export class CardComponent implements OnInit {

  @Input() format: string;

  constructor() { }

  ngOnInit() {
  }

}
