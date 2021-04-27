import { ConnectionPoint, PLCNode } from "../PLCNode";


export class LdLeftPowerRail {
  public xml: any;
  public localId: string;
  public height = 20;
  public width = 20;
  public position: { x: number, y: number } = {x: 0, y: 0};
  public connectionPointOut: {x: number, y: number, refLocalID: string} = {x: 0, y: 0, refLocalID: null};
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};
  public edges: string[] = [];

  constructor(xmlLeftPowerRail: any) {
    if (xmlLeftPowerRail === '') {
      this.createNewLeftPowerRail();
    }
    else {
      this.xml = xmlLeftPowerRail;
      this.localId = xmlLeftPowerRail.getAttribute('localId');
      if (xmlLeftPowerRail.getAttribute('width') !== undefined) {
        this.width = xmlLeftPowerRail.getAttribute('width');
      }
      if (xmlLeftPowerRail.getAttribute('height') !== undefined) {
        this.height = xmlLeftPowerRail.getAttribute('height');
      }
      if (xmlLeftPowerRail.getElementsByTagName('position')[0] !== undefined) {
        const position = xmlLeftPowerRail.getElementsByTagName('position')[0];
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if ( xmlLeftPowerRail.getElementsByTagName('connectionPointOut')[0]  !== undefined) {
        const connectionPointOut = xmlLeftPowerRail.getElementsByTagName('connectionPointOut')[0];
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
    this.node.id = this.localId;
    this.node.type = 'LPR';
    const newConnectionPointOut: ConnectionPoint = {
      type: "OUT",
      sourceId: this.localId,
      targetId: this.connectionPointOut.refLocalID,
      edgeId: null,
    }
    this.node.connectionPoints.push(newConnectionPointOut);

  }

  createNewLeftPowerRail(): void {
    const xmlString = '<leftPowerRail localId="0" height="20" width="20"> \n' +
      '              <position x="0" y="0"/> \n' +
      '              <connectionPointOut> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointOut> \n' +
      '            </leftPowerRail> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('leftPowerRail')[0];
  }
}
