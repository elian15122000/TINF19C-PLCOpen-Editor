import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})


export class EditorComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {

    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
      event.returnValue = 'Unsaved modifications';
      return event;
   });
  }

}
