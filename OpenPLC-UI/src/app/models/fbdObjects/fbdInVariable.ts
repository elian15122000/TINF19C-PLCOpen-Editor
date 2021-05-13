/**
 * @Filename : fbdInVariable.ts
 *
 * @Author : Leonie de Santis
 *
 * @Last_Modified : 13.05.2021
 *
 */
import { PLCNode, ConnectionPoint } from '../PLCNode';

export class FbdInVariable {
  public xml: any;
  public name = '';
  public localId: string;
  public height = 20;
  public width = 20;
  public negated = false;
  public position: { x: number, y: number } = { x: 0, y: 0 };
  public connectionPointOut: { x: number, y: number, refLocalID: string, formalParameter: string } =
    { x: 0, y: 0, refLocalID: null, formalParameter: null };
  public node: PLCNode = { id: null, label: null, type: null, connectionPoints: [] };

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
  constructor(xmlInVariable: any) {
    if (xmlInVariable === '') {
      this.createNewInVariable();
    }
    else {
      this.xml = xmlInVariable;
      if (xmlInVariable.getElementsByTagName('expression') !== undefined) {
        this.name = xmlInVariable.getElementsByTagName('expression')[0].innerHTML;
      }
      this.localId = xmlInVariable.getAttribute('localId');
      if (xmlInVariable.getAttribute('width') !== undefined) {
        this.width = xmlInVariable.getAttribute('width');
      }
      if (xmlInVariable.getAttribute('height') !== undefined) {
        this.height = xmlInVariable.getAttribute('height');
      }
      if (xmlInVariable.getAttribute('negated') === true) {
        this.negated = xmlInVariable.getAttribute('negated');
      }
      if (xmlInVariable.getElementsByTagName('position')[0] !== undefined) {
        const position = xmlInVariable.getElementsByTagName('position')[0];
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y') };
      }
      if (xmlInVariable.getElementsByTagName('connectionPointOut')[0] !== undefined) {
        const connectionPointOut = xmlInVariable.getElementsByTagName('connectionPointOut')[0];
        if (connectionPointOut.getElementsByTagName('relPosition') !== undefined) {
          const position = connectionPointOut.getElementsByTagName('relPosition')[0];
          this.connectionPointOut.x = position.getAttribute('x');
          this.connectionPointOut.y = position.getAttribute('y');
        }
        if (connectionPointOut.getElementsByTagName('connection')[0] !== undefined) {
          const connection = connectionPointOut.getElementsByTagName('connection')[0];
          this.connectionPointOut.refLocalID = connection.getAttribute('refLocalId');
          // IMPORTANT: read the formal parameter
          this.connectionPointOut.formalParameter = connection.getAttribute('formalParameter');
          console.log(connection);
        }
      }

      // values that are relevant for illustration are written into nodes
      this.node.id = this.localId;
      this.node.label = this.name;
      this.node.type = 'var';
      const newConnectionPoint: ConnectionPoint = {
        type: 'OUT',
        sourcePoint: 'OUT',
        targetPoint: this.connectionPointOut.formalParameter,
        sourceId: this.localId,
        sourceName: this.node.label,
        targetId: this.connectionPointOut.refLocalID,
        edgeId: null,
      };
      this.node.connectionPoints.push(newConnectionPoint);

    }
  }

  // creates a default xml-file for the object
  createNewInVariable(): void {
    const xmlString = '<inVariable localId="0" height="20" width="20" negated="false" > \n' +
      '              <position x="0" y="0"/> \n' +
      '              <connectionPointOut> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointOut> \n' +
      '              <expression>LocalVar0</expression>' + // added expression
      '            </inVariable> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('inVariable')[0];

  }

  // updates attributes of position
  updatePosition(xPos: number, yPos: number): void {
    this.xml.getElementsByTagName('position')[0].setAttribute('x', xPos);
    this.xml.getElementsByTagName('position')[0].setAttribute('y', yPos);
  }

  // updates relevant attribute
  updateAttributes(localId, name, negated): void{
    this.xml.setAttribute('localId', localId);
    this.xml.setAttribute('negated', negated);
    this.xml.getElementsByTagName('expression')[0].innerHTML = name;
    this.node.id = localId;
    this.node.label = name;
    this.node.type = 'var';
    const newConnectionPoint: ConnectionPoint = {
      type: 'OUT',
      sourcePoint: 'OUT',
      targetPoint: null,
      targetName: null,
      sourceId: localId,
      sourceName: name,
      targetId: null,
      edgeId: null,
    };
    this.node.connectionPoints.push(newConnectionPoint);
  }
}
