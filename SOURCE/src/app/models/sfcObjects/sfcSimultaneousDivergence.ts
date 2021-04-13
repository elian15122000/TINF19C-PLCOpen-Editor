export class SfcSimultaneousDivergence{
  public xml: any;
  public localId: number;
  public globalId: number;
  public height = 20;
  public width = 20;
  public name = '';
  public connectionPointIn: {x: 0, y: 0};
  public connectionPointOut: {x: 0, y: 0};
  public position: {x: 0, y: 0};

  constructor(xmlSimDivergence: any) {
    if (xmlSimDivergence === '') {
      this.createXML();
    } else {
      this.xml = xmlSimDivergence;
      if (xmlSimDivergence.getAttribute('localId') !== undefined) {
        this.localId = xmlSimDivergence.getAttribute('localId');
      }
      if (xmlSimDivergence.getAttribute('globalId') !== undefined) {
        this.globalId = xmlSimDivergence.getAttribute('globalId');
      }
      if (xmlSimDivergence.getAttribute('height') !== undefined) {
        this.height = xmlSimDivergence.getAttribute('height');
      }
      if (xmlSimDivergence.getAttribute('width') !== undefined) {
        this.width = xmlSimDivergence.getAttribute('width');
      }
      if (xmlSimDivergence.getAttribute('name') !== undefined) {
        this.name = xmlSimDivergence.getAttribute('name');
      }
      if (xmlSimDivergence.getElementsByTagName('connectionPointIn') !== undefined) {
        for (const item of xmlSimDivergence.getElementsByTagName('connectionPointIn')) {
          const relPos = item.getElementsByTagName('relPosition');
          if (relPos[0] !== undefined) {
            const inX = relPos[0].getAttribute('x');
            const inY = relPos[0].getAttribute('y');
            this.connectionPointIn = {x: inX, y: inY};
          }
        }
      }
      if (xmlSimDivergence.getElementsByTagName('connectionPointOut') !== undefined) {
        for (const item of xmlSimDivergence.getElementsByTagName('connectionPointOut')) {
          const relPos = item.getElementsByTagName('relPosition');
          if (relPos[0] !== undefined) {
            const outX = relPos[0].getAttribute('x');
            const outY = relPos[0].getAttribute('y');
            this.connectionPointOut = {x: outX, y: outY};
          }
        }
      }
      if (xmlSimDivergence.getElementsByTagName('position') !== undefined) {
        const position = xmlSimDivergence.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
    }
  }
  createXML(): void {
    const xmlString = '<simultaneousDivergence localId="0" height="50" width="30" name="">\n' +
      '<position x="0" y="0"/>\n' +
      '   <connectionPointIn>\n' +
      ' <relPosition x="0" y="0"/>\n' +
      '</connectionPointIn>\n' +
      '<connectionPointOut>\n' +
      '<relPosition x="0" y="0"/>\n' +
      ' </connectionPointOut>\n' +
      '              </simultaneousDivergence>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('simultaneousDivergence')[0];
  }
}
