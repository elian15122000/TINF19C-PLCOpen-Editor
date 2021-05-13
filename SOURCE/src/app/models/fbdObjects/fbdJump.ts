/**
 * @Filename : fbdJump.ts
 *
 * @Author : Leonie de Santis
 *
 * @Last_Modified : 13.05.2021
 *
 */
import { PLCNode, ConnectionPoint } from '../PLCNode';

export class FbdJump {
  public xml: any;
  public localId: string;
  public height = 20;
  public width = 20;
  public label = '';
  public position: {x: number, y: number} = {x: 0, y: 0};
  public connectionPointIn: { x: number, y: number, refLocalID: string} = {x: 0, y: 0, refLocalID: null};
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};
  public edges: string[] = [];

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
  constructor(xmlJump: any) {
    if (xmlJump === '') {
      this.createNewJump();
    }
    else {
      this.xml = xmlJump;
      this.localId = xmlJump.getAttribute('localId');
      if (xmlJump.getAttribute('width') !== undefined) {
        this.width = xmlJump.getAttribute('width');
      }
      if (xmlJump.getAttribute('height') !== undefined) {
        this.height = xmlJump.getAttribute('height');
      }
      if (xmlJump.getAttribute('label') !== undefined) {
        this.label = xmlJump.getAttribute('label');
      }
      if (xmlJump.getElementsByTagName('position')[0] !== undefined) {
        const position = xmlJump.getElementsByTagName('position')[0];
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if ( xmlJump.getElementsByTagName('connectionPointIn')[0] !== undefined) {
        const connectionPointIn = xmlJump.getElementsByTagName('connectionPointIn')[0];
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
    this.node.label = this.label;
    this.node.type = 'jump';
    const newConnectionPointIn: ConnectionPoint = {
      type: 'IN',
      sourceId: this.connectionPointIn.refLocalID,
      targetId: this.localId,
      edgeId: null
    };
    this.node.connectionPoints.push(newConnectionPointIn);
  }

  // creates a default xml-file for the object
  createNewJump(): void {
    const xmlString = '<jump localId="0" height="20" width="20" label="" > \n' +
      '              <position x="0" y="0"/> \n' +
      '              <connectionPointIn> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointIn> \n' +
      '            </jump> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('jump')[0];
  }

  // updates attributes of position
  updatePosition(xPos: number, yPos: number): void {
    this.xml.getElementsByTagName('position')[0].setAttribute('x', xPos);
    this.xml.getElementsByTagName('position')[0].setAttribute('y', yPos);
  }

  // updates relevant attributes
  updateAttributes(localId: number, label: string): void{
    this.xml.setAttribute('localId', localId);
    this.xml.setAttribute('label', label);
  }

  // updates refId of ConnectionPointIn
  change_refid(newRef): void {
    this.xml.getElementsByTagName('connectionPointIn')[0].getElementsByTagName('connection')[0].setAttribute('refLocalId', newRef);
  }
}
