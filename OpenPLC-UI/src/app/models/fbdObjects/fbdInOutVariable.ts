/**
 * @Filename : fbdInOutVariable.ts
 *
 * @Author : Leonie de Santis
 *
 * @Last_Modified : 13.05.2021
 *
 */

import { ConnectionPoint, PLCNode } from '../PLCNode';

export class FbdInOutVariable {
  public xml: any;
  public name = '';
  public localId: string;
  public height = 20;
  public width = 20;
  public negatedIn = false;
  public negatedOut = false;
  public position: { x: number, y: number } = { x: 0, y: 0 };
  public connectionPointIn: { x: number, y: number, refLocalID: string } = { x: 0, y: 0, refLocalID: null };
  public connectionPointOut: { x: number, y: number, refLocalID: string } = { x: 0, y: 0, refLocalID: null };
  public node: PLCNode = { id: null, label: null, type: null, connectionPoints: [] };

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
  constructor(xmlInOutVariable: any) {
    if (xmlInOutVariable === '') {
      this.createNewInOutVariable();
    }
    else {
      this.xml = xmlInOutVariable;
      if (xmlInOutVariable.getElementsByTagName('expression') !== undefined) {
        this.name = xmlInOutVariable.getElementsByTagName('expression')[0].innerHTML;
      }
      this.localId = xmlInOutVariable.getAttribute('localId');
      if (xmlInOutVariable.getAttribute('width') !== undefined) {
        this.width = xmlInOutVariable.getAttribute('width');
      }
      if (xmlInOutVariable.getAttribute('height') !== undefined) {
        this.height = xmlInOutVariable.getAttribute('height');
      }
      if (xmlInOutVariable.getAttribute('negatedIn') === true) {
        this.negatedIn = true;
      }
      if (xmlInOutVariable.getAttribute('negatedOut') === true) {
        this.negatedIn = true;
      }
      if (xmlInOutVariable.getElementsByTagName('position')[0] !== undefined) {
        const position = xmlInOutVariable.getElementsByTagName('position')[0];
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y') };
      }
      if (xmlInOutVariable.getElementsByTagName('connectionPointIn')[0] !== undefined) {
        const connectionPointIn = xmlInOutVariable.getElementsByTagName('connectionPointIn')[0];
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
      if (xmlInOutVariable.getElementsByTagName('connectionPointOut')[0] !== undefined) {
        const connectionPointOut = xmlInOutVariable.getElementsByTagName('connectionPointOut')[0];
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

      // values that are relevant for illustration are written into nodes
      this.node.id = this.localId;
      this.node.label = this.name;
      this.node.type = 'fbdInOutVariable';

      const newConnectionPointOut: ConnectionPoint = {
        type: 'OUT',
        sourcePoint: 'OUT',
        sourceName: this.node.label,
        sourceId: this.localId,
        targetId: this.connectionPointOut.refLocalID,
        edgeId: null,
      };
      this.node.connectionPoints.push(newConnectionPointOut);

      const newConnectionPointIn: ConnectionPoint = {
        type: 'IN',
        targetPoint: 'IN',
        targetName: this.node.label,
        sourceId: this.connectionPointIn.refLocalID,
        targetId: this.localId,
        edgeId: null
      };
      this.node.connectionPoints.push(newConnectionPointIn);
    }

  }

  // creates a default xml-file for the object
  createNewInOutVariable(): void {
    const xmlString = '<inOutVariable localId="0" height="20" width="20" negatedIn="false" negatedOut="false" > \n' +
      '              <position x="0" y="0"/> \n' +
      '              <connectionPointIn> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointIn> \n' +
      '              <connectionPointOut> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointOut> \n' +
      '            </inOutVariable> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('inOutVariable')[0];
  }

  // updates attributes of position
  updatePosition(xPos: number, yPos: number): void {
    this.xml.getElementsByTagName('position')[0].setAttribute('x', xPos);
    this.xml.getElementsByTagName('position')[0].setAttribute('y', yPos);
  }

  // updates relevant attributes
  updateAttributes(localId: string, name, negatedIn: string, negatedOut: string): void{
    this.xml.setAttribute('localId', localId);
    this.xml.setAttribute('negated', negatedIn);
    this.xml.setAttribute('negated', negatedOut);
    this.xml.getElementsByTagName('expression')[0].innerHTML = name;
  }

  // updates refId of ConnectionPointIn
  change_refid(newRef): void {
    this.xml.getElementsByTagName('connectionPointIn')[0].getElementsByTagName('connection')[0].setAttribute('refLocalId', newRef);
  }
}
