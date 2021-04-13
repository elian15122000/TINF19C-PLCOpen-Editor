import { Injectable } from '@angular/core';
import {ProjectService} from './project.service';

@Injectable({
  providedIn: 'root'
})
// Liest die hochgeladene xml-Datei und speichert die Werte an der entsprechenden Variable des ProjectService
export class ImportService {
  xmlFile: any;

  constructor(private projectService: ProjectService) {
  }

  fileUpload(event: Event): void {
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
        this.uploadProject();
      };
      reader.readAsText(file);
    }
  }

  uploadProject(): void {
    try {
      this.projectService.headerItems = [];
      this.projectService.pouItems = [];
      const parser = new DOMParser();
      const dom = parser.parseFromString(this.xmlFile, 'application/xml');
      const i = dom.documentElement.getElementsByTagName('pous')[0].childElementCount;
      for (let j = 0; j < i; j++){
        this.projectService.pouItems.push(dom.documentElement.getElementsByTagName('pou')[j]);
        console.log(this.projectService.pouItems[j]);
      }

      this.projectService.headerItems.push(dom.documentElement.getElementsByTagName('fileHeader')[0]);
      this.projectService.headerItems.push(dom.documentElement.getElementsByTagName('contentHeader')[0]);
      this.projectService.instanceItems = dom.documentElement.getElementsByTagName('instances')[0];
      console.log(this.projectService.headerItems[0]);
      console.log(this.projectService.headerItems[1]);
      console.log(this.projectService.instanceItems);
    } catch (e) {
      console.log('FEHLER BEIM IMPORT');
    }
  }
}
