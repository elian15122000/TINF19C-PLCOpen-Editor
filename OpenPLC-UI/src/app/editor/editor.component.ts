import { Component, OnInit } from '@angular/core';
import {ImportService} from '../import.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  upload = '';

  constructor(private importService: ImportService) { }

  ngOnInit(): void {
    this.upload = this.importService.xmlfile;
  }

}
