/**
 * @Filename : commonContinuation.ts
 *
 * @Author : Franziska Kopp
 *
 * @Last_Modified : 19.05.2021
 *
 */

import {Node} from '@swimlane/ngx-graph';
import { ConnectionPoint, PLCNode } from '../PLCNode';

export class CommonContinuation{
  public xml: any;
  public localId: string;
  public height = 20;
  public width = 20;
  public connectionPointOut: {x: 0, y: 0, refLocalId: '', formalParameter: ''};
  public position: {x: 0, y: 0};
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
  constructor(xmlCommonContinuation: any) {
    if (xmlCommonContinuation === ''){
      this.createXML();
    } else {
      this.xml = xmlCommonContinuation;
      if (xmlCommonContinuation.getAttribute('localId') !== undefined){
        this.localId = xmlCommonContinuation.getAttribute('localId');
      }
      if (xmlCommonContinuation.getAttribute('height') !== undefined){
        this.height = xmlCommonContinuation.getAttribute('height');
      }
      if (xmlCommonContinuation.getAttribute('width') !== undefined){
        this.width = xmlCommonContinuation.getAttribute('width');
      }
      if (xmlCommonContinuation.getElementsByTagName('position') !== undefined) {
        const position = xmlCommonContinuation.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if ( xmlCommonContinuation.getElementsByTagName('connectionPointOut')  !== undefined) {
        const connectionPointOut = xmlCommonContinuation.getElementsByTagName('connectionPointOut')[0];
        if (connectionPointOut.getElementsByTagName('relPosition') !== undefined) {
          const position = connectionPointOut.getElementsByTagName('relPosition')[0];
          this.connectionPointOut.x = position.getAttribute('x');
          this.connectionPointOut.y = position.getAttribute('y');
        }
        if (connectionPointOut.getElementsByTagName('connection')[0] !== undefined) {
          const connection = connectionPointOut.getElementsByTagName('connection')[0];
          this.connectionPointOut.refLocalId = connection.getAttribute('refLocalId');
          this.connectionPointOut.formalParameter = connection.getAttribute('formalParameter');
        }
      }
    }
    // values that are relevant for illustration are written into nodes
    this.node.id = this.localId;
    this.node.type = 'default';
    const newConnectionPoint: ConnectionPoint = {
      type: "OUT",
      sourcePoint: "OUT",
      targetPoint: this.connectionPointOut.formalParameter,
      sourceId: this.localId,
      sourceName: this.node.label,
      targetId: this.connectionPointOut.refLocalId,
      edgeId: null,
    }
    this.node.connectionPoints.push(newConnectionPoint);
  }

  // creates a default xml-file for the object
  createXML(): void{
    const xmlString = '<continuation localId="0" height="50" width="30" name=""  >\n' +
      '<position x="0" y="0"/>\n' +
    '<connectionPointOut>\n' +
      '<relPosition x="0" y="0"/>\n' +
      '</connectionPointOut>\n' +
      '              </continuation>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('continuation')[0];
    this.xml = this.xml.getElementsByTagName('continuation')[0];
  }
  // updates attributes of position
  updatePosition(xPos: number, yPos: number): void {
    this.xml.getElementsByTagName('position')[0].setAttribute('x', xPos);
    this.xml.getElementsByTagName('position')[0].setAttribute('y', yPos);
  }
// updates relevant attributes
  updateAttributes(localId: number, name: string): void{
    this.xml.setAttribute('localId', localId);
    this.xml.setAttribute('name', name);
  }
}
