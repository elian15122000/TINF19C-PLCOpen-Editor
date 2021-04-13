export class FbdReturn {
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public position: {x: number, y: number};
  public connectionPointIn: { x: number, y: number, refLocalID: number} = {x: 0, y: 0, refLocalID: 0};

  constructor(xmlReturn: any) {
    if (xmlReturn === '') {
      this.createNewReturn();
    }
    else {
      this.xml = xmlReturn;
      this.localId = xmlReturn.getAttribute('localId');
      if (xmlReturn.getAttribute('width') !== undefined) {
        this.width = xmlReturn.getAttribute('width');
      }
      if (xmlReturn.getAttribute('height') !== undefined) {
        this.height = xmlReturn.getAttribute('height');
      }
      if (xmlReturn.getElementsByTagName('position') !== undefined) {
        const position = xmlReturn.getElementsByTagName('position')[0];
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if ( xmlReturn.getElementsByTagName('connectionPointIn')  !== undefined) {
        const connectionPointIn = xmlReturn.getElementsByTagName('connectionPointIn')[0];
        if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
          const position = connectionPointIn.getElementsByTagName('relPosition')[0];
          this.connectionPointIn.x = position.getAttribute('x');
          this.connectionPointIn.y = position.getAttribute('y');
        }
        if (connectionPointIn.getElementsByTagName('connection') !== undefined) {
          const connection = connectionPointIn.getElementsByTagName('connection')[0];
          this.connectionPointIn.refLocalID = connection.getAttribute('refLocalID');
        }
      }
    }
  }

  createNewReturn(): void {
    const xmlString = '<return localId="0" height="20" width="20" > \n' +
      '              <position x="0" y="0"/> \n' +
      '              <connectionPointIn> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointIn> \n' +
      '            </return> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('return')[0];
  }
}
