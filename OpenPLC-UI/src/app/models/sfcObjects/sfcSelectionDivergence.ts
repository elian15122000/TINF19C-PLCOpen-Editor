import {ConnectionPoint, PLCNode} from '../PLCNode';

export class SfcSelectionDivergence{
  public xml: any;
  public localId: string;
  public globalId: number;
  public height = 20;
  public width = 20;
  public connectionPointIn: {x: number, y: number, refLocalId: string, formalParameter: string} [] = [];
  public connectionPointOut: {x: number, y: number, refLocalId: string, formalParameter: string} [] = [];
  public position: {x: 0, y: 0};
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};

  constructor(xmlSelDivergence: any) {
    if (xmlSelDivergence === '') {
      this.createXML();
    } else {
      this.xml = xmlSelDivergence;
      if (xmlSelDivergence.getAttribute('localId') !== undefined) {
        this.localId = xmlSelDivergence.getAttribute('localId');
      }
      if (xmlSelDivergence.getAttribute('globalId') !== undefined) {
        this.globalId = xmlSelDivergence.getAttribute('globalId');
      }
      if (xmlSelDivergence.getAttribute('height') !== undefined) {
        this.height = xmlSelDivergence.getAttribute('height');
      }
      if (xmlSelDivergence.getAttribute('width') !== undefined) {
        this.width = xmlSelDivergence.getAttribute('width');
      }
      for (const connectionPointIn of xmlSelDivergence.getElementsByTagName('connectionPointIn')){
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
      for (const connectionPointOut of xmlSelDivergence.getElementsByTagName('connectionPointOut'))
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
      if (xmlSelDivergence.getElementsByTagName('position') !== undefined) {
        const position = xmlSelDivergence.getElementsByTagName('position')[0];
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
    const xmlString = '<selectionDivergence localId="0" height="50" width="30">\n' +
      '<position x="0" y="0"/>\n' +
      '   <connectionPointIn>\n' +
      ' <relPosition x="0" y="0"/>\n' +
      '</connectionPointIn>\n' +
      '<connectionPointOut>\n' +
      '<relPosition x="0" y="0"/>\n' +
      ' </connectionPointOut>\n' +
      '              </selectionDivergence>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('selectionDivergence')[0];
  }
}


