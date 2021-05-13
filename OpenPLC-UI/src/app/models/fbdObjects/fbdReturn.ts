/**
 * @Filename : fbdReturn.ts
 *
 * @Author : Leonie de Santis
 *
 * @Last_Modified : 13.05.2021
 *
 */
import { ConnectionPoint, PLCNode } from '../PLCNode';


export class FbdReturn {
  public xml: any;
  public localId: string;
  public height = 20;
  public width = 20;
  public position: {x: number, y: number};
  public connectionPointIn: { x: number, y: number, refLocalID: string} = {x: 0, y: 0, refLocalID: null};
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};
  public edges: string[] = [];

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
  constructor(xmlReturn: any) {
    if (xmlReturn === '') {
      this.createNewReturn();
    }
    else {
      this.xml = xmlReturn;
      this.localId = xmlReturn.getAttribute('localId');
      if (xmlReturn.getAttribute('width') !== undefined) {
        this.width = xmlReturn.getAttribute('width');
      }
      if (xmlReturn.getAttribute('height') !== undefined) {
        this.height = xmlReturn.getAttribute('height');
      }
      if (xmlReturn.getElementsByTagName('position')[0] !== undefined) {
        const position = xmlReturn.getElementsByTagName('position')[0];
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if ( xmlReturn.getElementsByTagName('connectionPointIn')[0] !== undefined) {
        const connectionPointIn = xmlReturn.getElementsByTagName('connectionPointIn')[0];
        if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
          const position = connectionPointIn.getElementsByTagName('relPosition')[0];
          this.connectionPointIn.x = position.getAttribute('x');
          this.connectionPointIn.y = position.getAttribute('y');
        }
        if (connectionPointIn.getElementsByTagName('connection')[0] !== undefined) {
          const connection = connectionPointIn.getElementsByTagName('connection')[0];
          this.connectionPointIn.refLocalID = connection.getAttribute('refLocalId');
        }
      }
    }

    // values that are relevant for illustration are written into nodes
    this.node.id = this.localId;
    this.node.type = 'return';
    const newConnectionPointIn: ConnectionPoint = {
      type: 'IN',
      sourceId: this.connectionPointIn.refLocalID,
      targetId: this.localId,
      edgeId: null
    };
    this.node.connectionPoints.push(newConnectionPointIn);
  }

  // creates a default xml-file for the object
  createNewReturn(): void {
    const xmlString = '<return localId="0" height="20" width="20" > \n' +
      '              <position x="0" y="0"/> \n' +
      '              <connectionPointIn> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointIn> \n' +
      '            </return> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('return')[0];
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
