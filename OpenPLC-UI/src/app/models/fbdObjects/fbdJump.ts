export class FbdJump {
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public label = '';
  public position: {x: number, y: number} = {x: 0, y: 0};
  public connectionPointIn: { x: number, y: number, refLocalID: number} = {x: 0, y: 0, refLocalID: 0};

  constructor(xmlJump: any) {
    if (xmlJump === '') {
      this.createNewJump();
    }
    else {
      this.xml = xmlJump;
      this.localId = xmlJump.getAttribute('localId');
      if (xmlJump.getAttribute('width') !== undefined) {
        this.width = xmlJump.getAttribute('width');
      }
      if (xmlJump.getAttribute('height') !== undefined) {
        this.height = xmlJump.getAttribute('height');
      }
      if (xmlJump.getAttribute('label') !== undefined) {
        this.label = xmlJump.getAttribute('label');
      }
      if (xmlJump.getElementsByTagName('position') !== undefined) {
        const position = xmlJump.getElementsByTagName('position')[0];
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if ( xmlJump.getElementsByTagName('connectionPointIn')  !== undefined) {
        const connectionPointIn = xmlJump.getElementsByTagName('connectionPointIn')[0];
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

  createNewJump(): void {
    const xmlString = '<jump localId="0" height="20" width="20" label="" > \n' +
      '              <position x="0" y="0"/> \n' +
      '              <connectionPointIn> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointIn> \n' +
      '            </jump> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('jump')[0];
  }
}
