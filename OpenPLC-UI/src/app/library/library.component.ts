import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {EditorService} from '../services/editor.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  public functionBlocks: any[] = [];

  constructor(private http: HttpClient, private editorService: EditorService) {
  }

  ngOnInit(): void {
  }

  loadFunctionBlocks(blockUrl: string): void {
    this.functionBlocks = [];
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'text/xml' });
    httpHeaders.append('Accept', 'text/xml');
    httpHeaders.append('Content-Type', 'text/xml');
    this.http.get('../assets/xmlResources/' + blockUrl,
      {headers: httpHeaders, responseType: 'text'}).subscribe((data) => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(data, 'application/xml');
        const i = dom.documentElement.getElementsByTagName('pous')[0].childElementCount;
        for (let j = 0; j < i; j++){
          const pou = dom.documentElement.getElementsByTagName('pou')[j];
          this.functionBlocks.push(pou);
        }
      });
  }

  addFB(fbXml: any): void{
    this.editorService.addFB(fbXml);
  }
}
