import { Injectable } from '@angular/core';
import xml2js from 'xml2js';
import {ProjectService} from './project.service';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  xmlFile: any;
  public xmlItems: any;

  constructor(private projectService: ProjectService) {
  }

  fileUpload(event: Event): void {
    console.log(event);
    // @ts-ignore
    if (event.target.files[0] !== null) {
      // @ts-ignore
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.xmlFile = (evt as any).target.result;
        this.parseXML(this.xmlFile)
          .then((data) => {
            this.xmlItems = data[0];
            console.log(this.xmlItems);
            this.setPOUs();
          });
      };
      reader.readAsText(file);
    }
  }

  parseXML(data: string): any {
    return new Promise(resolve => {
      const arr = [];
      const parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      parser.parseString(data, function (err, result) {
        const obj = result.project;
        arr.push({
          project: obj,
        });
        resolve(arr);
      });
    });
  }

  setPOUs(): void {
    this.projectService.pous = this.xmlItems.project.types[0].pous;
    console.log(this.projectService.pous);
  }
}
