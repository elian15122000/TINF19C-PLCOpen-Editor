export class SfcSelectionConvergence{
  public xml: any;
  public localId: number;
  public globalId: number;
  public height = 20;
  public width = 20;
  public connectionPointIn: {x: 0, y: 0};
  public connectionPointOut: {x: 0, y: 0};
  public position: {x: 0, y: 0};

  constructor(xmlSelConvergence: any) {
    if (xmlSelConvergence === '') {
      this.createXML();
    } else {
      this.xml = xmlSelConvergence;
      if (xmlSelConvergence.getAttribute('localId') !== undefined) {
        this.localId = xmlSelConvergence.getAttribute('localId');
      }
      if (xmlSelConvergence.getAttribute('globalId') !== undefined) {
        this.globalId = xmlSelConvergence.getAttribute('globalId');
      }
      if (xmlSelConvergence.getAttribute('height') !== undefined) {
        this.height = xmlSelConvergence.getAttribute('height');
      }
      if (xmlSelConvergence.getAttribute('width') !== undefined) {
        this.width = xmlSelConvergence.getAttribute('width');
      }
      if (xmlSelConvergence.getElementsByTagName('connectionPointIn') !== undefined) {
        for (const item of xmlSelConvergence.getElementsByTagName('connectionPointIn')) {
          const relPos = item.getElementsByTagName('relPosition');
          if (relPos[0] !== undefined) {
            const inX = relPos[0].getAttribute('x');
            const inY = relPos[0].getAttribute('y');
            this.connectionPointIn = {x: inX, y: inY};
          }
        }
      }
      if (xmlSelConvergence.getElementsByTagName('connectionPointOut') !== undefined) {
        for (const item of xmlSelConvergence.getElementsByTagName('connectionPointOut')) {
          const relPos = item.getElementsByTagName('relPosition');
          if (relPos[0] !== undefined) {
            const outX = relPos[0].getAttribute('x');
            const outY = relPos[0].getAttribute('y');
            this.connectionPointOut = {x: outX, y: outY};
          }
        }
      }
      if (xmlSelConvergence.getElementsByTagName('position') !== undefined) {
        const position = xmlSelConvergence.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
    }
  }
  createXML(): void {
    const xmlString = '<selectionConvergence localId="0" height="50" width="30">\n' +
      '<position x="0" y="0"/>\n' +
      '   <connectionPointIn>\n' +
      ' <relPosition x="0" y="0"/>\n' +
      '</connectionPointIn>\n' +
      '<connectionPointOut>\n' +
      '<relPosition x="0" y="0"/>\n' +
      ' </connectionPointOut>\n' +
      '              </selectionConvergence>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('selectionConvergence')[0];
  }
}
