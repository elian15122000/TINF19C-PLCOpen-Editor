import { Node } from '@swimlane/ngx-graph';
import { ConnectionPoint, PLCNode } from '../PLCNode';

export class FbdOutVariable {
  public xml: any;
  public name = '';
  public localId: string;
  public height = 20;
  public width = 20;
  public negated = false;
  public position: { x: 0, y: 0 } = { x: 0, y: 0 };
  public connectionPointIn: { x: number, y: number, refLocalID: string } = { x: 0, y: 0, refLocalID: null };
  public node: PLCNode = { id: null, label: null, type: null, connectionPoints: [] };


  constructor(xmlOutVariable: any) {
    if (xmlOutVariable === '') {
      this.createNewOutVariable();
    }
    else {
      this.xml = xmlOutVariable;
      if (xmlOutVariable.getElementsByTagName('expression')[0] !== undefined) {
        this.name = xmlOutVariable.getElementsByTagName('expression')[0].innerHTML;
      }
      this.localId = xmlOutVariable.getAttribute('localId');
      if (xmlOutVariable.getAttribute('width') !== undefined) {
        this.width = xmlOutVariable.getAttribute('width');
      }
      if (xmlOutVariable.getAttribute('height') !== undefined) {
        this.height = xmlOutVariable.getAttribute('height');
      }
      if (xmlOutVariable.getAttribute('negated') === true) {
        this.negated = xmlOutVariable.getAttribute('negated');
      }
      if (xmlOutVariable.getElementsByTagName('position')[0] !== undefined) {
        const posistion = xmlOutVariable.getElementsByTagName('position')[0];
        this.position = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y') };
      }
      if (xmlOutVariable.getElementsByTagName('connectionPointIn')[0] !== undefined) {
        const connectionPointIn = xmlOutVariable.getElementsByTagName('connectionPointIn')[0];
        if (connectionPointIn.getElementsByTagName('relPosition')[0] !== undefined) {
          const position = connectionPointIn.getElementsByTagName('relPosition')[0];
          this.connectionPointIn.x = position.getAttribute('x');
          this.connectionPointIn.y = position.getAttribute('y');
        }
        if (connectionPointIn.getElementsByTagName('connection')[0] !== undefined) {
          const connection = connectionPointIn.getElementsByTagName('connection')[0];
          this.connectionPointIn.refLocalID = connection.getAttribute('refLocalId');
        }
      }
      this.node.id = this.localId;
      this.node.label = this.name;
      this.node.type = 'var';

      const newConnectionPoint: ConnectionPoint = {
        type: 'IN',
        targetPoint: 'IN',
        sourceId: this.connectionPointIn.refLocalID,
        targetId: this.localId,
        targetName: this.node.label,
        edgeId: null
      };
      this.node.connectionPoints.push(newConnectionPoint);
    }
  }

  createNewOutVariable(): void {
    const xmlString = '<outVariable localId="0" height="20" width="20" negated="false" > \n' +
      '              <position x="0" y="0"/> \n' +
      '              <connectionPointIn> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointIn> \n' +
      '            </outVariable> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('outVariable')[0];
  }
}
