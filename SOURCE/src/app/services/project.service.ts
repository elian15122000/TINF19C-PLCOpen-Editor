/**
 * @Filename : project.service.ts
 *
 * @Author : Leonie de Santis
 *
 * @Last_Modified : 13.05.2021
 *
 */

import { Injectable } from '@angular/core';
import {DatePipe} from '@angular/common';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})

// The ProjectService contains all relevant information
export class ProjectService {
  public pouItems: any[] = [];
  public headerItems: any[] = [];
  public instanceItems: any;

  constructor() { }

  // This function reads the names of the pous and is used for the project overview
  getPouName(): string[] {
    const pouNames = [];
    this.pouItems.forEach((item) => {
      pouNames.push(item.getAttribute('name'));
    });
    return pouNames;
  }

  // This function reads the project name
  getProjectName(): string {
    if ( this.headerItems[1].getAttribute('name') !== undefined) {
      return this.headerItems[1].getAttribute('name');
    }
    return '';
  }

  // the function searches for the according pou
  getPou(pouName: string): any {
    let pou;
    for (const item of this.pouItems) {
      const check = (item.getAttribute('name') === pouName);
      if (check) {
        pou = item;
        return pou;
      }
    }
    return undefined;
  }

  // Delete a pou -> remove pou from pouItems
  deletePou(pouName: string): void {
    this.pouItems = this.pouItems.filter( (pou) =>
      pou.getAttribute('name') !== pouName);
  }

  // Add Pou -> create a default-xml of a pou and add it to the pouItems
  addPou(pouName: string, pouType: string, lang: string): void {
    const pouStr = '<pou name="' + pouName + '" pouType="' + pouType + '">\n' +
      '        <interface/>' +
      '        <body>\n' +
      '          <' + lang + '/>\n' +
      '        </body>\n' +
      '      </pou>';

    const parser = new DOMParser();
    this.pouItems.push(parser.parseFromString(pouStr, 'application/xml').getElementsByTagName('pou')[0]);
  }

  // Create a new Project
  // clear the existing lists
  // create the default xml strings of the headers and instances
  createNewProject(projectName: string): void {
    this.headerItems = [];
    this.pouItems = [];
    const datePipe = new DatePipe('en-US');
    const date = datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
    if (projectName === '') {
      projectName = 'Unbenannt';
    }

    // xml string of the fileHeader-Tag
    const fileHeaderStr = '<fileHeader companyName="Unbekannt" productName="Unbenannt" ' +
      'productVersion="1" creationDateTime="' + date + '"/>';

    // xml string of the conentHeader-Tag
    const contentHeaderStr = '<contentHeader name="' + projectName + '" modificationDateTime="' + date + '">\n' +
      '    <coordinateInfo>\n' +
      '      <fbd>\n' +
      '        <scaling x="10" y="10"/>\n' +
      '      </fbd>\n' +
      '      <ld>\n' +
      '        <scaling x="10" y="10"/>\n' +
      '      </ld>\n' +
      '      <sfc>\n' +
      '        <scaling x="10" y="10"/>\n' +
      '      </sfc>\n' +
      '    </coordinateInfo>\n' +
      '  </contentHeader>';

    // xml string of the default instances-Tag
    const instanceStr = '<instances>\n' +
      '    <configurations>\n' +
      '      <configuration name="Config0">\n' +
      '        <resource name="Res0"/>\n' +
      '      </configuration>\n' +
      '    </configurations>\n' +
      '  </instances>';

    const parser = new DOMParser();
    this.headerItems.push(parser.parseFromString(fileHeaderStr, 'application/xml').getElementsByTagName('fileHeader')[0]);
    this.headerItems.push(parser.parseFromString(contentHeaderStr, 'application/xml').getElementsByTagName('contentHeader')[0]);
    this.instanceItems = parser.parseFromString(instanceStr, 'application/xml').getElementsByTagName('instances')[0];
  }

  // export Project -> merge the xml of the headers, pous and instances and save as plc.xml
  exportProject(): void {
    let pouString = '';
    this.pouItems.forEach((item) => {
      pouString = pouString + item.outerHTML + '\n';
      while (pouString.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) {
        pouString = pouString.replace(' xmlns:xhtml="http://www.w3.org/1999/xhtml"', '');
      }
      while (pouString.includes('xmlns=""')) {
        pouString = pouString.replace(' xmlns=""', '');
      }
    });
    const xmlString2 =
      '<types>\n' +
      '    <dataTypes/>\n' +
      '    <pous>\n' + pouString +
      '    </pous>\n' +
      '</types>\n';
    const fullStr =
      '<?xml version=\'1.0\' encoding=\'utf-8\'?>\n' +
      '<project xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://www.plcopen.org/xml/tc6_0201">\n' +
      this.headerItems[0].outerHTML + '\n' + this.headerItems[1].outerHTML + '\n' + xmlString2 + this.instanceItems.outerHTML + '\n</project>';
    const blob = new Blob([fullStr], {type: 'text/xml;charset=utf-8'});
    saveAs(blob, 'plc.xml');
  }

}


