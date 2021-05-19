/**
 * @Filename : commonError.ts
 *
 * @Author : Franziska Kopp
 *
 * @Last_Modified : 19.05.2021
 *
 */

import {Node} from '@swimlane/ngx-graph';
import { PLCNode } from '../PLCNode';

export class CommonError{
  public xml: any;
  public localId: string;
  public height = 20;
  public width = 20;
  public content = '';
  public position: {x: 0, y: 0};
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
  constructor(xmlCommonError: any) {
    if (xmlCommonError === '') {
      this.createXML();
    } else {
      this.xml = xmlCommonError;
      if (xmlCommonError.getAttribute('localId') !== undefined) {
        this.localId = xmlCommonError.getAttribute('localId');
      }
      if (xmlCommonError.getAttribute('height') !== undefined) {
        this.height = xmlCommonError.getAttribute('height');
      }
      if (xmlCommonError.getAttribute('width') !== undefined) {
        this.width = xmlCommonError.getAttribute('width');
      }
      if (xmlCommonError.getAttribute('content') !== undefined) {
        this.content = xmlCommonError.getElementsByTagName('content')[0].children[0].innerText;
      }
      if (xmlCommonError.getElementsByTagName('position') !== undefined) {
        const position = xmlCommonError.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
    }
    // values that are relevant for illustration are written into nodes
    this.node.id = this.localId;
    this.node.type = 'default';
  }
  // creates a default xml-file for the object
  createXML(): void{
    const xmlString = '<error localId="0" height="50" width="30" >\n' +
      '<position x="0" y="0"/>\n' +
      '              <content>\n' +
      '<xhtml:p><![CDATA[Kommentar]]>\n</xhtml:p>\n' +
      '</content>\n' +
      '              </error>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    const temp = this.xml.getElementsByTagName('parsererror')[0];
    temp.parentNode.removeChild(temp);
    this.xml = this.xml.getElementsByTagName('error')[0];
  }
  // updates attributes of position
  updatePosition(xPos: number, yPos: number): void {
    this.xml.getElementsByTagName('position')[0].setAttribute('x', xPos);
    this.xml.getElementsByTagName('position')[0].setAttribute('y', yPos);
  }
  // updates relevant attributes
  updateAttributes(localId: number): void{
    this.xml.setAttribute('localId', localId);
  }
}
