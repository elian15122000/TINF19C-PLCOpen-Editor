import { Injectable } from '@angular/core';
import {DatePipe} from '@angular/common';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
// In diesem Service sind alle Infomationen eines Projekts gespeichert
export class ProjectService {
  public pouItems: any[] = [];
  public headerItems: any[] = [];
  public instanceItems: any;

  constructor() { }

  getPouName(): string[] {
    const pouNames = [];
    this.pouItems.forEach((item) => {
      pouNames.push(item.getAttribute('name'));
    });
    return pouNames;
  }

  getProjectName(): string {
    if ( this.headerItems[1].getAttribute('name') !== undefined) {
      return this.headerItems[1].getAttribute('name');
    }
    return '';
  }

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

  deletePou(pouName: string): void {
    this.pouItems = this.pouItems.filter( (pou) =>
      pou.getAttribute('name') !== pouName);
  }

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

  createNewProject(projectName: string): void {
    this.headerItems = [];
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

  exportProject(): void {
    const xmlString =
      '<?xml version=\'1.0\' encoding=\'utf-8\'?>\n' +
      '<project xmlns:ns1="http://www.plcopen.org/xml/tc6_0201" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://www.plcopen.org/xml/tc6_0201"/>';
    const parser = new DOMParser();
    const projectXML = parser.parseFromString(xmlString, 'application/xml');
    projectXML.getElementsByTagName('project')[0].appendChild(this.headerItems[0]);
    projectXML.getElementsByTagName('project')[0].appendChild(this.headerItems[1]);
    const xmlString2 =
      '<types>\n' +
      '    <dataTypes/>\n' +
      '    <pous/>\n' +
      '</types>';
    const typesXML = parser.parseFromString(xmlString2, 'application/xml');
    this.pouItems.forEach((item) => {
      typesXML.getElementsByTagName('pous')[0].appendChild(item);
    });
    projectXML.getElementsByTagName('project')[0].appendChild(typesXML.getElementsByTagName('types')[0]);
    projectXML.getElementsByTagName('project')[0].appendChild(this.instanceItems);
    const fullStr =
      '<?xml version=\'1.0\' encoding=\'utf-8\'?>\n' + projectXML.getElementsByTagName('project')[0].outerHTML;
    const blob = new Blob([fullStr], {type: 'text/xml;charset=utf-8'});
    saveAs(blob, 'plc.xml');
  }

}


