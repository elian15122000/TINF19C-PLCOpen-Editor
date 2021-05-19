/**
 * @Filename : sfcSelectionConvergence.ts
 *
 * @Author : Franziska Kopp
 *
 * @Last_Modified : 19.05.2021
 *
 */

import {ConnectionPoint, PLCNode} from '../PLCNode';

export class SfcSelectionConvergence {
  public xml: any;
  public localId: string;
  public globalId: number;
  public height = 20;
  public width = 20;
  public connectionPointIn: { x: number, y: number, refLocalId: string, formalParameter: string }[] = [];
  public connectionPointOut: { x: number, y: number, refLocalId: string, formalParameter: string }[] = [];
  public position: { x: 0, y: 0 };
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
  constructor(xmlSelConvergence: any) {
    if (xmlSelConvergence === '') {
      this.createXML();
    } else {
      this.xml = xmlSelConvergence;
      if (xmlSelConvergence.getAttribute('localId') !== undefined) {
        this.localId = xmlSelConvergence.getAttribute('localId');
      }
      if (xmlSelConvergence.getAttribute('globalId') !== undefined) {
        this.globalId = xmlSelConvergence.getAttribute('globalId');
      }
      if (xmlSelConvergence.getAttribute('height') !== undefined) {
        this.height = xmlSelConvergence.getAttribute('height');
      }
      if (xmlSelConvergence.getAttribute('width') !== undefined) {
        this.width = xmlSelConvergence.getAttribute('width');
      }
      for (const connectionPointIn of xmlSelConvergence.getElementsByTagName('connectionPointIn')) {
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
      for (const connectionPointOut of xmlSelConvergence.getElementsByTagName('connectionPointOut'))
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
      if (xmlSelConvergence.getElementsByTagName('position') !== undefined) {
        const position = xmlSelConvergence.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
    }
    // values that are relevant for illustration are written into nodes
    this.node.id = this.localId;
    this.node.type = 'default';
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
    const xmlString = '<selectionConvergence localId="0" height="50" width="30">\n' +
      '<position x="0" y="0"/>\n' +
      '   <connectionPointIn>\n' +
      ' <relPosition x="0" y="0"/>\n' +
      '</connectionPointIn>\n' +
      '<connectionPointOut>\n' +
      '<relPosition x="0" y="0"/>\n' +
      ' </connectionPointOut>\n' +
      '              </selectionConvergence>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('selectionConvergence')[0];
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
// updates refId of ConnectionPointIn
  change_refid(newRef): void {
    this.xml.getElementsByTagName('connectionPointIn')[0].getElementsByTagName('connection')[0].setAttribute('refLocalId', newRef);
  }
}
