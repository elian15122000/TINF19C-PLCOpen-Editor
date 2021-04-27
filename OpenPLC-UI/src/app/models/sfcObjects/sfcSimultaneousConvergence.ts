import {ConnectionPoint, PLCNode} from "../PLCNode";

export class SfcSimultaneousConvergence{
  public xml: any;
  public localId: string;
  public globalId: number;
  public height = 20;
  public width = 20;
  public connectionPointIn: { x: number, y: number, refLocalId: string, formalParameter: string }[] = [];
  public connectionPointOut: { x: number, y: number, refLocalId: string, formalParameter: string }[] = [];
  public position: {x: 0, y: 0};
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};

  constructor(xmlSimConvergence: any) {
    if (xmlSimConvergence === '') {
      this.createXML();
    } else {
      this.xml = xmlSimConvergence;
      if (xmlSimConvergence.getAttribute('localId') !== undefined) {
        this.localId = xmlSimConvergence.getAttribute('localId');
      }
      if (xmlSimConvergence.getAttribute('globalId') !== undefined) {
        this.globalId = xmlSimConvergence.getAttribute('globalId');
      }
      if (xmlSimConvergence.getAttribute('height') !== undefined) {
        this.height = xmlSimConvergence.getAttribute('height');
      }
      if (xmlSimConvergence.getAttribute('width') !== undefined) {
        this.width = xmlSimConvergence.getAttribute('width');
      }
      for (const connectionPointIn of xmlSimConvergence.getElementsByTagName('connectionPointIn')) {
        const newConnectionPoint = {x: 0, y: 0, refLocalId: '', formalParameter: ''};
        if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
          const position = connectionPointIn.getElementsByTagName('relPosition')[0];
          newConnectionPoint.x = position.getAttribute('x');
          newConnectionPoint.y = position.getAttribute('y');
        }
        if (connectionPointIn.getElementsByTagName('connection')[0] !== undefined) {
          const connection = connectionPointIn.getElementsByTagName('connection')[0];
          newConnectionPoint.refLocalId = connection.getAttribute('refLocalId');
          newConnectionPoint.formalParameter = connection.getAttribute('formalParameter');
        }
        this.connectionPointIn.push(newConnectionPoint);
      }
      for (const connectionPointOut of xmlSimConvergence.getElementsByTagName('connectionPointOut'))
      {
        const newConnectionPoint = {x: 0, y: 0, refLocalId: '', formalParameter: ''};
        if (connectionPointOut.getElementsByTagName('relPosition') !== undefined) {
          const position = connectionPointOut.getElementsByTagName('relPosition')[0];
          newConnectionPoint.x = position.getAttribute('x');
          newConnectionPoint.y = position.getAttribute('y');
        }
        if (connectionPointOut.getElementsByTagName('connection')[0] !== undefined) {
          const connection = connectionPointOut.getElementsByTagName('connection')[0];
          newConnectionPoint.refLocalId = connection.getAttribute('refLocalId');
          newConnectionPoint.formalParameter = connection.getAttribute('formalParameter');
        }
        this.connectionPointIn.push(newConnectionPoint);
      }
      if (xmlSimConvergence.getElementsByTagName('position') !== undefined) {
        const position = xmlSimConvergence.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
    }
    this.node.id = this.localId;
    this.node.type = 'default';
    for (let i = 0; i < this.connectionPointIn.length; i++){
      const newConnectionPointIn: ConnectionPoint = {
        type: 'IN',
        sourceId: this.connectionPointIn[i].refLocalId,
        targetId: this.localId,
        edgeId: null
      };
      this.node.connectionPoints.push(newConnectionPointIn);
    }
    for (let i = 0; i < this.connectionPointOut.length; i++){
      const newConnectionPointOut: ConnectionPoint = {
        type: 'OUT',
        sourceId: this.connectionPointOut[i].refLocalId,
        targetId: this.localId,
        edgeId: null
      };
      this.node.connectionPoints.push(newConnectionPointOut);
    }
  }
  createXML(): void {
    const xmlString = '<simultaneousConvergence localId="0" height="50" width="30">\n' +
      '<position x="0" y="0"/>\n' +
      '   <connectionPointIn>\n' +
      ' <relPosition x="0" y="0"/>\n' +
      '</connectionPointIn>\n' +
      '<connectionPointOut>\n' +
      '<relPosition x="0" y="0"/>\n' +
      ' </connectionPointOut>\n' +
      '              </simultaneousConvergence>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('simultaneousConvergence')[0];
  }
}
