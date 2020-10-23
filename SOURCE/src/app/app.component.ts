import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PLC-Editor';

  isDisplay = false;
  toggleDisplay() {
    this.isDisplay = !this.isDisplay;
  }


  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.isDisplay = !this.isDisplay;
  }
}
