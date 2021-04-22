import {Node} from '@swimlane/ngx-graph';

export class LdRightPowerRail {
  public xml: any;
  public localId: string;
  public height = 20;
  public width = 20;
  public position: { x: number, y: number } = {x: 0, y: 0};
  public connectionPointIn: { x: number, y: number, refLocalID: string} = {x: 0, y: 0, refLocalID: null};
  public node: Node = {id: null, label: null, type: null, pins: null};
  public edges: string[] = [];

  constructor(xmlRightPowerRail: any) {
    if (xmlRightPowerRail === '') {
      this.createNewRightPowerRail();
    }
    else {
      this.xml = xmlRightPowerRail;
      this.localId = xmlRightPowerRail.getAttribute('localId');
      if (xmlRightPowerRail.getAttribute('width') !== undefined) {
        this.width = xmlRightPowerRail.getAttribute('width');
      }
      if (xmlRightPowerRail.getAttribute('height') !== undefined) {
        this.height = xmlRightPowerRail.getAttribute('height');
      }
      if (xmlRightPowerRail.getElementsByTagName('position')[0] !== undefined) {
        const position = xmlRightPowerRail.getElementsByTagName('position')[0];
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if ( xmlRightPowerRail.getElementsByTagName('connectionPointIn')[0]  !== undefined) {
        const connectionPointIn = xmlRightPowerRail.getElementsByTagName('connectionPointIn')[0];
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
    }
    this.node.id = this.localId;
    this.node.type = 'RPR';
    this.node.pins = {
      IN: {type: 'IN', edge: null}
    };
    if (this.connectionPointIn.refLocalID != null){
      this.edges.push(this.connectionPointIn.refLocalID);
    }
  }

  createNewRightPowerRail(): void {
    const xmlString = '<rightPowerRail localId="0" height="20" width="20"> \n' +
      '              <position x="0" y="0"/> \n' +
      '              <connectionPointIn> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointIn> \n' +
      '            </rightPowerRail> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('rightPowerRail')[0];
  }
}
