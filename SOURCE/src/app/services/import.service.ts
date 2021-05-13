/**
 * @Filename : import.service.ts
 *
 * @Author : Leonie de Santis
 *
 * @Last_Modified : 13.05.2021
 *
 */

import { Injectable } from '@angular/core';
import {ProjectService} from './project.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ImportService {
  xmlFile: any;



  constructor(private projectService: ProjectService, private router: Router) {

  }

  // check if a file was uploaded and read the uploaded file as a string
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

  // Tries to read the information of the xml-file and saves
  // the different parts (header, pous and instances) into the projectService.
  // If there is an invalid xml-file an error message is shown on the display
  uploadProject(): void {
    try {
      this.projectService.headerItems = [];
      this.projectService.pouItems = [];
      const parser = new DOMParser();
      const dom = parser.parseFromString(this.xmlFile, 'application/xml');
      const i = dom.documentElement.getElementsByTagName('pous')[0].childElementCount;
      for (let j = 0; j < i; j++){
        this.projectService.pouItems.push(dom.documentElement.getElementsByTagName('pou')[j]);
      }
      this.projectService.headerItems.push(dom.documentElement.getElementsByTagName('fileHeader')[0]);
      this.projectService.headerItems.push(dom.documentElement.getElementsByTagName('contentHeader')[0]);
      this.projectService.instanceItems = dom.documentElement.getElementsByTagName('instances')[0];
    } catch (e) {
      alert('The uploaded file is empty or corrupted! \n Please upload another file.');
      if (this.router.url === '/') {
        this.router.navigateByUrl('home');
      }
      else if (this.router.url === '/home') {
        this.router.navigateByUrl('');
      }
      else if (this.router.url === '/projectOverview') {
        this.router.navigateByUrl('home');
      }
    }
  }
}
