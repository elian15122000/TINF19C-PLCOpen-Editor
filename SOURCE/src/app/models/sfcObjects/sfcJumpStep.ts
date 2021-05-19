/**
 * @Filename : sfcJumpStep.ts
 *
 * @Author : Franziska Kopp
 *
 * @Last_Modified : 19.05.2021
 *
 */

import { ConnectionPoint, PLCNode } from '../PLCNode';


export class SfcJumpStep {
  public xml: any;
  public localId: string;
  public height = 20;
  public width = 20;
  public targetName = '';
  public connectionPointIn: {x: number, y: number, refLocalID: string, formalParameter: string} = {x: 0, y: 0, refLocalID: '', formalParameter: ''};
  public position: {x: 0, y: 0};
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
constructor(xmlJumpStep: any) {
  if (xmlJumpStep === '') {
    this.createXML();
  } else {
    this.xml = xmlJumpStep;
    if (xmlJumpStep.getAttribute('localId') !== undefined) {
      this.localId = xmlJumpStep.getAttribute('localId');
    }
    if (xmlJumpStep.getAttribute('height') !== undefined) {
      this.height = xmlJumpStep.getAttribute('height');
    }
    if (xmlJumpStep.getAttribute('width') !== undefined) {
      this.width = xmlJumpStep.getAttribute('width');
    }
    if (xmlJumpStep.getAttribute('targetName') !== undefined) {
      this.targetName = xmlJumpStep.getAttribute('targetName');
    }
    if ( xmlJumpStep.getElementsByTagName('connectionPointIn')  !== undefined) {
      const connectionPointIn = xmlJumpStep.getElementsByTagName('connectionPointIn')[0];
      if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
        const position = connectionPointIn.getElementsByTagName('relPosition')[0];
        this.connectionPointIn.x = position.getAttribute('x');
        this.connectionPointIn.y = position.getAttribute('y');
      }
      if (connectionPointIn.getElementsByTagName('connection')[0] !== undefined) {
        const connection = connectionPointIn.getElementsByTagName('connection')[0];
        this.connectionPointIn.refLocalID = connection.getAttribute('refLocalId');
        this.connectionPointIn.formalParameter = connection.getAttribute('formalParameter');
      }
    }
    if (xmlJumpStep.getElementsByTagName('position') !== undefined) {
      const position = xmlJumpStep.getElementsByTagName('position')[0];
      this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
  }
  // values that are relevant for illustration are written into nodes
  this.node.id = this.localId;
  this.node.type = 'default';
  const newConnectionPointIn: ConnectionPoint = {
    type: 'IN',
    sourceId: this.connectionPointIn.refLocalID,
    targetId: this.localId,
    edgeId: null
  };
  this.node.connectionPoints.push(newConnectionPointIn);

}
// creates a default xml-file for the object
  createXML(): void{
    const xmlString = '<jumpStep localId="0" height="50" width="30" targetName="">\n' +
      '<position x="0" y="0"/>\n' +
      '   <connectionPointIn>\n' +
      ' <relPosition x="0" y="0"/>\n' +
      '</connectionPointIn>\n' +
      '              </jumpStep>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('jumpStep')[0];
  }
  // updates attributes of position
  updatePosition(xPos: number, yPos: number): void {
    this.xml.getElementsByTagName('position')[0].setAttribute('x', xPos);
    this.xml.getElementsByTagName('position')[0].setAttribute('y', yPos);
  }
// updates relevant attributes
  updateAttributes(localId: number, targetName: string): void{
    this.xml.setAttribute('localId', localId);
    this.xml.setAttribute('targetName', targetName);
  }
// updates refId of ConnectionPointIn
  change_refid(newRef): void {
    this.xml.getElementsByTagName('connectionPointIn')[0].getElementsByTagName('connection')[0].setAttribute('refLocalId', newRef);
  }
}
