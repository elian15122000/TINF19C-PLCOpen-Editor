import { Component, OnInit } from '@angular/core';
import {AngularResizedEventModule, ResizedEvent} from 'angular-resize-event';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})

export class ConsoleComponent implements OnInit {
  width: number | undefined;
  height: number | undefined;

  public onResized(event: ResizedEvent): void {
    this.width = event.newWidth;
    this.height = event.newHeight;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
