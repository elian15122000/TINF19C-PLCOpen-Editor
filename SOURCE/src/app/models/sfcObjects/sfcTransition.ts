/**
 * @Filename : sfcTransition.ts
 *
 * @Author : Franziska Kopp
 *
 * @Last_Modified : 19.05.2021
 *
 */

import {ConnectionPoint, PLCNode} from '../PLCNode';

export class SfcTransition {
  public xml: any;
  public localId: string;
  public height = 20;
  public width = 20;
  public connectionPointIn: {x: 0, y: 0, refLocalId: '', formalParameter: string};
  public connectionPointOut: {x: 0, y: 0, refLocalId: '', formalParameter: string};
  public position: {x: 0, y: 0};
  public conditionReferenceName = '';
  public conditionConnectionPointIn: {x: 0, y: 0, refLocalId: '', formalParameter: string};
  public conditionInlineName = '';
  public conditionNegated = false;
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
  constructor(xmlTransition: any) {
    if (xmlTransition === '') {
      this.createXML();
    } else {
      this.xml = xmlTransition;
      if (xmlTransition.getAttribute('localId') !== undefined) {
        this.localId = xmlTransition.getAttribute('localId');
      }
      if (xmlTransition.getAttribute('height') !== undefined) {
        this.height = xmlTransition.getAttribute('height');
      }
      if (xmlTransition.getAttribute('width') !== undefined) {
        this.width = xmlTransition.getAttribute('width');
      }
      if (xmlTransition.getElementsByTagName('connectionPointIn') !== undefined) {
        for (const item of xmlTransition.getElementsByTagName('connectionPointIn')) {
          if (item.parentNode.tagName !== 'condition') {
            const relPos = item.getElementsByTagName('relPosition');
            let inX: any;
            let inY: any;
            let refLocId: '';
            let formalParam: '';
            if (relPos[0] !== undefined) {
              inX = relPos[0].getAttribute('x');
              inY = relPos[0].getAttribute('y');
            }
            const connection = item.getElementsByTagName('connection');
            if (connection[0] !== undefined) {
              refLocId = connection[0].getAttribute('refLocalId');
              formalParam = connection[0].getAttribute('formalParameter');
            }
            this.connectionPointIn = {x: inX, y: inY, refLocalId: refLocId, formalParameter: formalParam};
          }
        }
      }
      if (xmlTransition.getElementsByTagName('connectionPointOut') !== undefined) {
        for (const item of xmlTransition.getElementsByTagName('connectionPointOut')) {
          if (item.parentNode.tagName !== 'condition') {
            const relPos = item.getElementsByTagName('relPosition');
            let outX: any;
            let outY: any;
            let refLocId: '';
            let formalParam: '';
            if (relPos[0] !== undefined) {
              outX = relPos[0].getAttribute('x');
              outY = relPos[0].getAttribute('y');
            }
            const connection = item.getElementsByTagName('connection');
            if (connection[0] !== undefined) {
              refLocId = connection[0].getAttribute('refLocalId');
              formalParam = connection[0].getAttribute('formalParameter');
            }
            this.connectionPointOut = {x: outX, y: outY, refLocalId: refLocId, formalParameter: formalParam};
          }
        }
      }
      if (xmlTransition.getElementsByTagName('position') !== undefined) {
        const position = xmlTransition.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }

      if (xmlTransition.getElementsByTagName('condition') !== undefined) {
        const condition = xmlTransition.getElementsByTagName('condition');
        this.conditionNegated = condition[0].getAttribute('negated');
        if (condition[0].getElementsByTagName('inline') !== undefined) {
          const inline = condition[0].getElementsByTagName('inline');
          if (inline[0] !== undefined) {
            this.conditionInlineName = inline[0].getAttribute('name');
          }
        }
        if (condition[0].getElementsByTagName('reference') !== undefined) {
          const reference = condition[0].getElementsByTagName('reference');
          if (reference[0] !== undefined) {
            this.conditionReferenceName = reference[0].getAttribute('name');
          }
        }
        for (const item of condition[0].getElementsByTagName('connectionPointIn')) {
          const relPos = item.getElementsByTagName('relPosition');
          let inX: any;
          let inY: any;
          let refLocId: '';
          let formalParam: '';
          if (relPos[0] !== undefined) {
            inX = relPos[0].getAttribute('x');
            inY = relPos[0].getAttribute('y');
          }
          const connection = item.getElementsByTagName('connection');
          if (connection[0] !== undefined) {
            refLocId = connection[0].getAttribute('refLocalId');
            formalParam = connection[0].getAttribute('formalParameter');
          }
          this.conditionConnectionPointIn = {x: inX, y: inY, refLocalId: refLocId, formalParameter: formalParam};
        }
      }
    }
    // values that are relevant for illustration are written into nodes
    this.node.id = this.localId;
    this.node.type = 'default';
    const newConnectionPointIn: ConnectionPoint = {
      type: 'IN',
      sourceId: this.connectionPointIn.refLocalId,
      targetId: this.localId,
      edgeId: null
    };
    this.node.connectionPoints.push(newConnectionPointIn);

    const newConnectionPointOut: ConnectionPoint = {
      type: 'OUT',
      sourceId: this.connectionPointOut.refLocalId,
      targetId: this.localId,
      edgeId: null
    };
    this.node.connectionPoints.push(newConnectionPointOut);
  }
  // creates a default xml-file for the object
  createXML(): void {
    const xmlString = '<transition localId="0" height="50" width="30">\n' +
      '<position x="0" y="0"/>\n' +
      '<connectionPointIn>\n' +
      ' <relPosition x="0" y="0"/>\n' +
      '</connectionPointIn>\n' +
      '<connectionPointOut>\n' +
      '<relPosition x="0" y="0"/>\n' +
      ' </connectionPointOut>\n' +
      '<condition negated="false">' +
        '<reference name="">' +
        '<connectionPointIn>\n' +
        ' <relPosition x="0" y="0"/>\n' +
        '</connectionPointIn>\n' +
        '<inline name="">' +
        '</inline>' +
      '</reference>' +
      '</condition>' +
      '              </transition>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('transition')[0];
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
