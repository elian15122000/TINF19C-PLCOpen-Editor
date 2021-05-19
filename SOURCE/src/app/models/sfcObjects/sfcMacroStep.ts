/**
 * @Filename : sfcMacroStep.ts
 *
 * @Author : Franziska Kopp
 *
 * @Last_Modified : 19.05.2021
 *
 */

import {ConnectionPoint, PLCNode} from '../PLCNode';

export class SfcMacroStep {
  public xml: any;
  public localId: string;
  public height = 20;
  public width = 20;
  public name = '';
  public connectionPointIn: {x: 0, y: 0, refLocalId: '', formalParameter: string};
  public connectionPointOut: {x: 0, y: 0, refLocalId: '', formalParameter: string};
  public position: {x: 0, y: 0};
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
  constructor(xmlMacroStep: any) {
    if (xmlMacroStep === '') {
      this.createXML();
    } else {
      this.xml = xmlMacroStep;
      if (xmlMacroStep.getAttribute('localId') !== undefined) {
        this.localId = xmlMacroStep.getAttribute('localId');
      }
      if (xmlMacroStep.getAttribute('height') !== undefined) {
        this.height = xmlMacroStep.getAttribute('height');
      }
      if (xmlMacroStep.getAttribute('width') !== undefined) {
        this.width = xmlMacroStep.getAttribute('width');
      }
      if (xmlMacroStep.getAttribute('name') !== undefined) {
        this.name = xmlMacroStep.getAttribute('name');
      }
      if (xmlMacroStep.getElementsByTagName('position') !== undefined) {
        const position = xmlMacroStep.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if (xmlMacroStep.getElementsByTagName('connectionPointIn') !== undefined) {
        for (const item of xmlMacroStep.getElementsByTagName('connectionPointIn')) {
          const relPos = item.getElementsByTagName('relPosition');
          if (relPos[0] !== undefined) {
            this.connectionPointIn.x = relPos[0].getAttribute('x');
            this.connectionPointIn.y = relPos[0].getAttribute('y');
          }
          if (item.getElementsByTagName('connection')[0] !== undefined) {
            const connection = item.getElementsByTagName('connection')[0];
            this.connectionPointIn.refLocalId = connection.getAttribute('refLocalId');
            this.connectionPointIn.formalParameter = connection.getAttribute('formalParameter');
          }

        }
      }
      if (xmlMacroStep.getElementsByTagName('connectionPointOut') !== undefined) {
        for (const item of xmlMacroStep.getElementsByTagName('connectionPointOut')) {
          const relPos = item.getElementsByTagName('relPosition');
          if (relPos[0] !== undefined) {
            const outX = relPos[0].getAttribute('x');
            const outY = relPos[0].getAttribute('y');
            this.connectionPointOut.x = outX;
            this.connectionPointOut.y = outY;
          }
          if (item.getElementsByTagName('connection')[0] !== undefined) {
            const connection = item.getElementsByTagName('connection')[0];
            this.connectionPointOut.refLocalId = connection.getAttribute('refLocalId');
            this.connectionPointOut.formalParameter = connection.getAttribute('formalParameter');
          }
        }
      }
    }
    // values that are relevant for illustration are written into nodes
    this.node.id = this.localId;
    this.node.label = '';
    this.node.type = 'default';
    const newConnectionPointIn: ConnectionPoint = {
      type: 'IN',
      sourcePoint: 'IN',
      sourceId: this.connectionPointIn.refLocalId,
      targetId: this.localId,
      edgeId: null
    };
    const newConnectionPointOut: ConnectionPoint = {
      type: 'OUT',
      sourcePoint: 'OUT',
      sourceId: this.connectionPointOut.refLocalId,
      targetId: this.localId,
      edgeId: null
    };
    this.node.connectionPoints.push(newConnectionPointIn);
    this.node.connectionPoints.push(newConnectionPointOut);
  }
  // creates a default xml-file for the object
  createXML(): void {
    const xmlString = '<macroStep localId="0" height="50" width="30" name="">\n' +
      '<position x="0" y="0"/>\n' +
      '   <connectionPointIn>\n' +
      ' <relPosition x="0" y="0"/>\n' +
      '</connectionPointIn>\n' +
      '<connectionPointOut>\n' +
      '<relPosition x="0" y="0"/>\n' +
      ' </connectionPointOut>\n' +
      '              </macroStep>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('macroStep')[0];
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
