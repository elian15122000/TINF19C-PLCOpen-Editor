import { Injectable } from '@angular/core';
import xml2js from 'xml2js';
import {ProjectService} from './project.service';
import {VariablesService} from './variables.service';
import {Project} from '../models/project';
import {Pou} from '../models/pou';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  xmlFile: any;
  public xmlItems: any;

  constructor(private projectService: ProjectService, private variableService: VariablesService) {
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
            this.uploadProject();
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
      // tslint:disable-next-line:only-arrow-functions typedef
      parser.parseString(data, function(err, result) {
        const obj = result.project;
        arr.push({
          project: obj,
        });
        resolve(arr);
      });
    });
  }

  uploadProject(): void {
    try {
      if (this.xmlItems.project.contentHeader[0] !== undefined){
        this.projectService.project = new Project(this.xmlItems.project.contentHeader[0].$.name);

        let numberOfPous = 0;
        this.xmlItems.project.types[0].pous[0].pou.forEach((pou) => {
          this.projectService.project.pous.push(new Pou(pou.$.name, pou.$.pouType));
          this.projectService.project.pous[numberOfPous].variables = this.variableService.setVariables(pou);
          console.log(this.projectService.project);
          numberOfPous++;
        });
      }
    } catch (e) {
      console.log('FEHLER BEIM IMPORT');
    }
  }
}
