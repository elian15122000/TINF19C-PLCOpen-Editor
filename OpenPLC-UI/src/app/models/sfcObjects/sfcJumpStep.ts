import {Node} from '@swimlane/ngx-graph';

export class SfcJumpStep {
  public xml: any;
  public localId: string;
  public height = 20;
  public width = 20;
  public targetName = '';
  public connectionPointIn: {x: 0, y: 0, refLocalId: 0, formalParameter: string};
  public position: {x: 0, y: 0};
  public node: Node = {id: null, label: null, type: null, pins: null};

constructor(xmlJumpStep: any) {
  if (xmlJumpStep === '') {
    this.createXML();
  } else {
    this.xml = xmlJumpStep;
    if (xmlJumpStep.getAttribute('localId') !== undefined) {
      this.localId = xmlJumpStep.getAttribute('localId');
    }
    if (xmlJumpStep.getAttribute('height') !== undefined) {
      this.height = xmlJumpStep.getAttribute('height');
    }
    if (xmlJumpStep.getAttribute('width') !== undefined) {
      this.width = xmlJumpStep.getAttribute('width');
    }
    if (xmlJumpStep.getAttribute('targetName') !== undefined) {
      this.targetName = xmlJumpStep.getAttribute('targetName');
    }
    if ( xmlJumpStep.getElementsByTagName('connectionPointIn')  !== undefined) {
      const connectionPointIn = xmlJumpStep.getElementsByTagName('connectionPointIn')[0];
      if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
        const position = connectionPointIn.getElementsByTagName('relPosition')[0];
        this.connectionPointIn.x = position.getAttribute('x');
        this.connectionPointIn.y = position.getAttribute('y');
      }
      if (connectionPointIn.getElementsByTagName('connection')[0] !== undefined) {
        const connection = connectionPointIn.getElementsByTagName('connection')[0];
        this.connectionPointIn.refLocalId = connection.getAttribute('refLocalId');
        this.connectionPointIn.formalParameter = connection.getAttribute('formalParameter');
      }
    }
    if (xmlJumpStep.getElementsByTagName('position') !== undefined) {
      const position = xmlJumpStep.getElementsByTagName('position')[0];
      this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
  }
  this.node.id = this.localId;
  this.node.type = 'default';
  this.node.pins = {
    IN: {type: 'IN', refId: null, edge: null}
  };
  if (this.connectionPointIn.refLocalId != null){
    this.node.pins.IN.refId = this.connectionPointIn.refLocalId;
  }
}

  createXML(): void{
    const xmlString = '<jumpStep localId="0" height="50" width="30" targetName="">\n' +
      '<position x="0" y="0"/>\n' +
      '   <connectionPointIn>\n' +
      ' <relPosition x="0" y="0"/>\n' +
      '</connectionPointIn>\n' +
      '              </jumpStep>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('jumpStep')[0];
  }
}
