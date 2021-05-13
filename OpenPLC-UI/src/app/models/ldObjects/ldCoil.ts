/**
 * @Filename : ldCoil.ts
 *
 * @Author : Leonie de Santis
 *
 * @Last_Modified : 13.05.2021
 *
 */

import { ConnectionPoint, PLCNode } from '../PLCNode';


export class LdCoil {
  public xml: any;
  public localId: string;
  public height = 20;
  public width = 20;
  public negated = false;
  public variable = '';
  public position: { x: number, y: number } = {x: 0, y: 0};
  public connectionPointIn: { x: number, y: number, refLocalID: string} = {x: 0, y: 0, refLocalID: null};
  public connectionPointOut: {x: number, y: number, refLocalID: string} = {x: 0, y: 0, refLocalID: null};
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};
  public edges: string[] = [];

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
  constructor(xmlCoil: any) {
    if (xmlCoil === '') {
      this.createNewCoil();
    }
    else {
      this.xml = xmlCoil;
      this.localId = xmlCoil.getAttribute('localId');
      if (xmlCoil.getAttribute('width') !== undefined) {
        this.width = xmlCoil.getAttribute('width');
      }
      if (xmlCoil.getAttribute('height') !== undefined) {
        this.height = xmlCoil.getAttribute('height');
      }
      if (xmlCoil.getAttribute('negated') === true) {
        this.negated = true;
      }
      if (xmlCoil.getElementsByTagName('variable') !== undefined) {
        this.variable = xmlCoil.getElementsByTagName('variable')[0].innerHTML;
      }
      if (xmlCoil.getElementsByTagName('position')[0] !== undefined) {
        const position = xmlCoil.getElementsByTagName('position')[0];
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if ( xmlCoil.getElementsByTagName('connectionPointIn')[0] !== undefined) {
        const connectionPointIn = xmlCoil.getElementsByTagName('connectionPointIn')[0];
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
      if ( xmlCoil.getElementsByTagName('connectionPointOut')[0]  !== undefined) {
        const connectionPointOut = xmlCoil.getElementsByTagName('connectionPointOut')[0];
        if (connectionPointOut.getElementsByTagName('relPosition') !== undefined) {
          const position = connectionPointOut.getElementsByTagName('relPosition')[0];
          this.connectionPointOut.x = position.getAttribute('x');
          this.connectionPointOut.y = position.getAttribute('y');
        }
        if (connectionPointOut.getElementsByTagName('connection')[0] !== undefined) {
          const connection = connectionPointOut.getElementsByTagName('connection')[0];
          this.connectionPointOut.refLocalID = connection.getAttribute('refLocalId');
        }
      }
    }

    // values that are relevant for illustration are written into nodes
    this.node.id = this.localId;
    this.node.label = this.variable;
    this.node.type = 'coil';

    const newConnectionPointOut: ConnectionPoint = {
      type: 'OUT',
      sourceId: this.localId,
      targetId: this.connectionPointOut.refLocalID,
      edgeId: null,
    };
    this.node.connectionPoints.push(newConnectionPointOut);

    const newConnectionPointIn: ConnectionPoint = {
      type: 'IN',
      sourceId: this.connectionPointIn.refLocalID,
      targetId: this.localId,
      edgeId: null
    };
    this.node.connectionPoints.push(newConnectionPointIn);
  }

  // creates a default xml-file for the object
  createNewCoil(): void {
    const xmlString = '<coil localId="0" height="20" width="20" negated="false" > \n' +
      '              <position x="0" y="0"/> \n' +
      '              <variable></variable> \n' +
      '              <connectionPointIn> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointIn> \n' +
      '              <connectionPointOut> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointOut> \n' +
      '            </coil> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('coil')[0];
  }

  // updates attributes of position
  updatePosition(xPos: number, yPos: number): void {
    this.xml.getElementsByTagName('position')[0].setAttribute('x', xPos);
    this.xml.getElementsByTagName('position')[0].setAttribute('y', yPos);
  }

  // updates relevant attributes
  updateAttributes(localId: number, negated: string): void{
    this.xml.setAttribute('localId', localId);
    this.xml.setAttribute('negated', negated);
  }

  // updates refId of ConnectionPointIn
  change_refid(newRef): void {
    this.xml.getElementsByTagName('connectionPointIn')[0].getElementsByTagName('connection')[0].setAttribute('refLocalId', newRef);
  }
}
