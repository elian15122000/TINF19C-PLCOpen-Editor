import {Node} from '@swimlane/ngx-graph';

export class CommonConnector{
  public xml: any;
  public localId: string;
  public height = 20;
  public width = 20;
  public name = '';
  public connectionPointIn: {x: 0, y: 0, refLocalId: '', formalParameter: ''};
  public position: {x: 0, y: 0};
  public node: Node = {id: null, label: null, type: null, pins: null};

  constructor(xmlCommonConnector: any) {
    if (xmlCommonConnector === ''){
      this.createXML();
    } else{
      this.xml = xmlCommonConnector;
      if (xmlCommonConnector.getAttribute('localId') !== undefined){
        this.localId = xmlCommonConnector.getAttribute('localId');
      }
      if (xmlCommonConnector.getAttribute('height') !== undefined){
        this.height = xmlCommonConnector.getAttribute('height');
      }
      if (xmlCommonConnector.getAttribute('width') !== undefined){
        this.width = xmlCommonConnector.getAttribute('width');
      }
      if (xmlCommonConnector.getAttribute('name') !== undefined){
        this.name = xmlCommonConnector.getAttribute('name');
      }
      if (xmlCommonConnector.getElementsByTagName('position') !== undefined) {
        const position = xmlCommonConnector.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if ( xmlCommonConnector.getElementsByTagName('connectionPointIn')  !== undefined) {
        const connectionPointIn = xmlCommonConnector.getElementsByTagName('connectionPointIn')[0];
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
    }
    this.node.id = this.localId;
    this.node.label = this.name;
    this.node.type = 'default';
    this.node.pins = {
      IN: {type: 'IN', refId: null, edge: null}
    };
    if (this.connectionPointIn.refLocalId != null){
      this.node.pins.IN.refId = this.connectionPointIn.refLocalId;
    }
  }
  createXML(): void{
    const xmlString = '<connector localId="0" height="50" width="30" name=""  >\n' +
      '<position x="0" y="0"/>\n' +
 '   <connectionPointIn>\n' +
     ' <relPosition x="0" y="0"/>\n' +
      '</connectionPointIn>\n' +
    '              </connector>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('connector')[0];
  }
}
