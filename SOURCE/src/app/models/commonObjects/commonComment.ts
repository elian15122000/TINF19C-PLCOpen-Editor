/**
 * @Filename : commonComment.ts
 *
 * @Author : Franziska Kopp
 *
 * @Last_Modified : 19.05.2021
 *
 */

import {Node} from '@swimlane/ngx-graph';
import { PLCNode } from '../PLCNode';

export class CommonComment{
  public xml: any;
  public localId: string;
  public height = '20';
  public width = '20';
  public content = '';
  public position: {x: number, y: number} = {x: 0, y: 0};
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
  constructor(xmlCommonComment: any) {
    if (xmlCommonComment === ''){
      this.createXML();
    } else {
      this.xml = xmlCommonComment;
      if (xmlCommonComment.getAttribute('localId') !== undefined){
        this.localId = xmlCommonComment.getAttribute('localId');
      }
      if (xmlCommonComment.getAttribute('height') !== undefined){
        this.height = xmlCommonComment.getAttribute('height');
      }
      if (xmlCommonComment.getAttribute('width') !== undefined){
        this.width = xmlCommonComment.getAttribute('width');
      }
      if (xmlCommonComment.getAttribute('content') !== undefined){
        this.content = xmlCommonComment.getElementsByTagName('content')[0].children[0].innerText;
      }
      if (xmlCommonComment.getElementsByTagName('position') !== undefined) {
        const position = xmlCommonComment.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
    }
    // values that are relevant for illustration are written into nodes
    this.node.id = this.localId;
    this.node.label = this.content;
    this.node.type = 'var';

  }

  // creates a default xml-file for the object
  createXML(): void{
    const xmlString = '<comment localId="0" height="50" width="30"   >\n' +
      '              <position x="0" y="0"/>\n' +
    '              <content>\n' +
      '<xhtml:p><![CDATA[Kommentar]]>\n</xhtml:p>\n' +
      '</content>\n' +
    '              </comment>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    const temp = this.xml.getElementsByTagName('parsererror')[0];
    temp.parentNode.removeChild(temp);
    this.xml = this.xml.getElementsByTagName('comment')[0];
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
