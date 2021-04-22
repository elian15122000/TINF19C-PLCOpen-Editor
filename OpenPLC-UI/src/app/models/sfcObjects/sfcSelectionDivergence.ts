export class SfcSelectionDivergence{
  public xml: any;
  public localId: number;
  public globalId: number;
  public height = 20;
  public width = 20;
  public connectionPointIn: {x: number, y: number, refLocalId: string, formalParameter: string} = {x: 0, y: 0, refLocalId: '', formalParameter: ''};
  public connectionPointOut: {x: number, y: number, refLocalId: string, formalParameter: string} = {x: 0, y: 0, refLocalId: '', formalParameter: ''};
  public position: {x: 0, y: 0};

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
      if (xmlSelDivergence.getElementsByTagName('connectionPointIn') !== undefined) {
        for (const item of xmlSelDivergence.getElementsByTagName('connectionPointIn')) {
          const relPos = item.getElementsByTagName('relPosition');
          if (relPos[0] !== undefined) {
            this.connectionPointIn.x = relPos[0].getAttribute('x');
            this.connectionPointIn.y = relPos[0].getAttribute('y');
          }
          if (item.getElementsByTagName('connection')[0] !== undefined) {
            const connection = item.getElementsByTagName('connection')[0];
            this.connectionPointIn.refLocalId = connection.getAttribute('refLocalId');
            this.connectionPointIn.formalParameter = connection.getAttribute('formalParameter');
          }
        }
      }
      if (xmlSelDivergence.getElementsByTagName('connectionPointOut') !== undefined) {
        for (const item of xmlSelDivergence.getElementsByTagName('connectionPointOut')) {
          const relPos = item.getElementsByTagName('relPosition');
          if (relPos[0] !== undefined) {
            this.connectionPointOut.x = relPos[0].getAttribute('x');
            this.connectionPointOut.y = relPos[0].getAttribute('y');
          }
          if (item.getElementsByTagName('connection')[0] !== undefined) {
            const connection = item.getElementsByTagName('connection')[0];
            this.connectionPointOut.refLocalId = connection.getAttribute('refLocalId');
            this.connectionPointOut.formalParameter = connection.getAttribute('formalParameter');
          }
        }
      }
      if (xmlSelDivergence.getElementsByTagName('position') !== undefined) {
        const position = xmlSelDivergence.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
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


