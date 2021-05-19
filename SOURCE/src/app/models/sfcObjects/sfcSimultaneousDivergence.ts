/**
 * @Filename : sfcSimultaneousDivergence.ts
 *
 * @Author : Franziska Kopp
 *
 * @Last_Modified : 19.05.2021
 *
 */

import {ConnectionPoint, PLCNode} from '../PLCNode';

export class SfcSimultaneousDivergence{
  public xml: any;
  public localId: string;
  public globalId: number;
  public height = 20;
  public width = 20;
  public name = '';
  public connectionPointIn: { x: number, y: number, refLocalId: string, formalParameter: string }[] = [];
  public connectionPointOut: { x: number, y: number, refLocalId: string, formalParameter: string }[] = [];
  public position: {x: 0, y: 0};
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
  constructor(xmlSimDivergence: any) {
    if (xmlSimDivergence === '') {
      this.createXML();
    } else {
      this.xml = xmlSimDivergence;
      if (xmlSimDivergence.getAttribute('localId') !== undefined) {
        this.localId = xmlSimDivergence.getAttribute('localId');
      }
      if (xmlSimDivergence.getAttribute('globalId') !== undefined) {
        this.globalId = xmlSimDivergence.getAttribute('globalId');
      }
      if (xmlSimDivergence.getAttribute('height') !== undefined) {
        this.height = xmlSimDivergence.getAttribute('height');
      }
      if (xmlSimDivergence.getAttribute('width') !== undefined) {
        this.width = xmlSimDivergence.getAttribute('width');
      }
      if (xmlSimDivergence.getAttribute('name') !== undefined) {
        this.name = xmlSimDivergence.getAttribute('name');
      }

      for (const connectionPointIn of xmlSimDivergence.getElementsByTagName('connectionPointIn')) {
        const newConnectionPoint = {x: 0, y: 0, refLocalId: '', formalParameter: ''};
        if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
          const position = connectionPointIn.getElementsByTagName('relPosition')[0];
          newConnectionPoint.x = position.getAttribute('x');
          newConnectionPoint.y = position.getAttribute('y');
        }
        if (connectionPointIn.getElementsByTagName('connection')[0] !== undefined) {
          const connection = connectionPointIn.getElementsByTagName('connection')[0];
          newConnectionPoint.refLocalId = connection.getAttribute('refLocalId');
          newConnectionPoint.formalParameter = connection.getAttribute('formalParameter');
        }
        this.connectionPointIn.push(newConnectionPoint);
      }
      for (const connectionPointOut of xmlSimDivergence.getElementsByTagName('connectionPointOut'))
      {
        const newConnectionPoint = {x: 0, y: 0, refLocalId: '', formalParameter: ''};
        if (connectionPointOut.getElementsByTagName('relPosition') !== undefined) {
          const position = connectionPointOut.getElementsByTagName('relPosition')[0];
          newConnectionPoint.x = position.getAttribute('x');
          newConnectionPoint.y = position.getAttribute('y');
        }
        if (connectionPointOut.getElementsByTagName('connection')[0] !== undefined) {
          const connection = connectionPointOut.getElementsByTagName('connection')[0];
          newConnectionPoint.refLocalId = connection.getAttribute('refLocalId');
          newConnectionPoint.formalParameter = connection.getAttribute('formalParameter');
        }
        this.connectionPointIn.push(newConnectionPoint);
      }
      if (xmlSimDivergence.getElementsByTagName('position') !== undefined) {
        const position = xmlSimDivergence.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
    }
    // values that are relevant for illustration are written into nodes
    this.node.id = this.localId;
    this.node.type = 'default';
    this.node.label = this.name;
    for (let i = 0; i < this.connectionPointIn.length; i++){
      const newConnectionPointIn: ConnectionPoint = {
        type: 'IN',
        sourceId: this.connectionPointIn[i].refLocalId,
        targetId: this.localId,
        edgeId: null
      };
      this.node.connectionPoints.push(newConnectionPointIn);
    }
    for (let i = 0; i < this.connectionPointOut.length; i++){
      const newConnectionPointOut: ConnectionPoint = {
        type: 'OUT',
        sourceId: this.connectionPointOut[i].refLocalId,
        targetId: this.localId,
        edgeId: null
      };
      this.node.connectionPoints.push(newConnectionPointOut);
    }
  }
  // creates a default xml-file for the object
  createXML(): void {
    const xmlString = '<simultaneousDivergence localId="0" height="50" width="30" name="">\n' +
      '<position x="0" y="0"/>\n' +
      '   <connectionPointIn>\n' +
      ' <relPosition x="0" y="0"/>\n' +
      '</connectionPointIn>\n' +
      '<connectionPointOut>\n' +
      '<relPosition x="0" y="0"/>\n' +
      ' </connectionPointOut>\n' +
      '              </simultaneousDivergence>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('simultaneousDivergence')[0];
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
// updates refId of ConnectionPointIn
  change_refid(newRef): void {
    this.xml.getElementsByTagName('connectionPointIn')[0].getElementsByTagName('connection')[0].setAttribute('refLocalId', newRef);
  }
}
