import { Node} from '@swimlane/ngx-graph';

export class FbdInOutVariable {
  public xml: any;
  public name = '';
  public localId: string;
  public height = 20;
  public width = 20;
  public negatedIn = false;
  public negatedOut = false;
  public position: {x: number, y: number} = {x: 0, y: 0};
  public connectionPointIn: { x: number, y: number, refLocalID: string} = {x: 0, y: 0, refLocalID: null};
  public connectionPointOut: {x: number, y: number, refLocalID: string} = {x: 0, y: 0, refLocalID: null};
  public node: Node = {id: null, label: null, type: null, pins: null};


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
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if ( xmlInOutVariable.getElementsByTagName('connectionPointIn')[0]  !== undefined) {
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
      if ( xmlInOutVariable.getElementsByTagName('connectionPointOut')[0]  !== undefined) {
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
      this.node.id = this.localId;
      this.node.label = this.name;
      this.node.type = 'var';
      this.node.pins = {
        OUT: {type: 'OUT', refId: null ,edge: null},
        IN: {type: 'IN',  refId: null ,edge: null}
      };
      if (this.connectionPointOut.refLocalID != null){
        this.node.pins.OUT.refId = this.connectionPointOut.refLocalID;
      }
      if (this.connectionPointIn.refLocalID != null){
        this.node.pins.IN.refId = this.connectionPointIn.refLocalID;
      }
    }

  }

  createNewInOutVariable(): void {
    const xmlString = '<inOutVariable localId="0" height="20" width="20" negated="false" > \n' +
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
}
