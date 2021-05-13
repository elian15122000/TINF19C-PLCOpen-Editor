/**
 * @Filename : ldContact.ts
 *
 * @Author : Leonie de Santis
 *
 * @Last_Modified : 13.05.2021
 *
 */
import { ConnectionPoint, PLCNode } from '../PLCNode';


export class LdContact {
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
  constructor(xmlContact: any) {
    if (xmlContact === '') {
      this.createNewContact();
    }
    else {
      this.xml = xmlContact;
      this.localId = xmlContact.getAttribute('localId');
      if (xmlContact.getAttribute('width') !== undefined) {
        this.width = xmlContact.getAttribute('width');
      }
      if (xmlContact.getAttribute('height') !== undefined) {
        this.height = xmlContact.getAttribute('height');
      }
      if (xmlContact.getAttribute('negated') === true) {
        this.negated = true;
      }
      if (xmlContact.getElementsByTagName('variable')[0] !== undefined) {
        this.variable = xmlContact.getElementsByTagName('variable')[0].innerHTML;
      }
      if (xmlContact.getElementsByTagName('position')[0] !== undefined) {
        const position = xmlContact.getElementsByTagName('position')[0];
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if ( xmlContact.getElementsByTagName('connectionPointIn')[0]  !== undefined) {
        const connectionPointIn = xmlContact.getElementsByTagName('connectionPointIn')[0];
        if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
          const position = connectionPointIn.getElementsByTagName('relPosition')[0];
          this.connectionPointIn.x = position.getAttribute('x');
          this.connectionPointIn.y = position.getAttribute('y');
        }
        if (connectionPointIn.getElementsByTagName('connection')[0] !== undefined) {
          const connection = connectionPointIn.getElementsByTagName('connection')[0];
          this.connectionPointIn.refLocalID = connection.getAttribute('refLocalID');
        }
      }
      if ( xmlContact.getElementsByTagName('connectionPointOut')[0]  !== undefined) {
        const connectionPointOut = xmlContact.getElementsByTagName('connectionPointOut')[0];
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
    this.node.type = 'contact';
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
  createNewContact(): void {
    const xmlString = '<contact localId="0" height="20" width="20" negated="false" > \n' +
      '              <position x="0" y="0"/> \n' +
      '              <variable></variable> \n' +
      '              <connectionPointIn> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointIn> \n' +
      '              <connectionPointOut> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointOut> \n' +
      '            </contact> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('contact')[0];
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
