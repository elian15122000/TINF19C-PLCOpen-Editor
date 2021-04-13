export class SfcSimultaneousConvergence{
  public xml: any;
  public localId: number;
  public globalId: number;
  public height = 20;
  public width = 20;
  public connectionPointIn: {x: 0, y: 0};
  public connectionPointOut: {x: 0, y: 0};
  public position: {x: 0, y: 0};

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
      if (xmlSimConvergence.getElementsByTagName('connectionPointIn') !== undefined) {
        for (const item of xmlSimConvergence.getElementsByTagName('connectionPointIn')) {
          const relPos = item.getElementsByTagName('relPosition');
          if (relPos[0] !== undefined) {
            const inX = relPos[0].getAttribute('x');
            const inY = relPos[0].getAttribute('y');
            this.connectionPointIn = {x: inX, y: inY};
          }
        }
      }
      if (xmlSimConvergence.getElementsByTagName('connectionPointOut') !== undefined) {
        for (const item of xmlSimConvergence.getElementsByTagName('connectionPointOut')) {
          const relPos = item.getElementsByTagName('relPosition');
          if (relPos[0] !== undefined) {
            const outX = relPos[0].getAttribute('x');
            const outY = relPos[0].getAttribute('y');
            this.connectionPointOut = {x: outX, y: outY};
          }
        }
      }
      if (xmlSimConvergence.getElementsByTagName('position') !== undefined) {
        const position = xmlSimConvergence.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
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
