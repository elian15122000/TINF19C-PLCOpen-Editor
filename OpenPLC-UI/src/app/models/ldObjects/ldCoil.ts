export class LdCoil {
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public negated = false;
  public variable = '';
  public position: { x: number, y: number } = {x: 0, y: 0};
  public connectionPointIn: { x: number, y: number, refLocalID: number} = {x: 0, y: 0, refLocalID: 0};
  public connectionPointOut: {x: number, y: number, refLocalID: number} = {x: 0, y: 0, refLocalID: 0};

  constructor(xmlCoil: any) {
    if (xmlCoil === '') {
      this.createNewCoil();
    }
    else {
      this.xml = xmlCoil;
      this.localId = xmlCoil.getAttribute('localId');
      if (xmlCoil.getAttribute('width') !== undefined) {
        this.width = xmlCoil.getAttribute('width');
      }
      if (xmlCoil.getAttribute('height') !== undefined) {
        this.height = xmlCoil.getAttribute('height');
      }
      if (xmlCoil.getAttribute('negated') === true) {
        this.negated = true;
      }
      if (xmlCoil.getElementsByTagName('variable') !== undefined) {
        this.variable = xmlCoil.getElementsByTagName('variable')[0].innerHTML;
      }
      if (xmlCoil.getElementsByTagName('position') !== undefined) {
        const position = xmlCoil.getElementsByTagName('position')[0];
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if ( xmlCoil.getElementsByTagName('connectionPointIn')  !== undefined) {
        const connectionPointIn = xmlCoil.getElementsByTagName('connectionPointIn')[0];
        if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
          const position = connectionPointIn.getElementsByTagName('relPosition')[0];
          this.connectionPointIn.x = position.getAttribute('x');
          this.connectionPointIn.y = position.getAttribute('y');
        }
        if (connectionPointIn.getElementsByTagName('connection') !== undefined) {
          const connection = connectionPointIn.getElementsByTagName('connection')[0];
          this.connectionPointIn.refLocalID = connection.getAttribute('refLocalId');
        }
      }
      if ( xmlCoil.getElementsByTagName('connectionPointOut')[0]  !== undefined) {
        const connectionPointOut = xmlCoil.getElementsByTagName('connectionPointOut')[0];
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
  }

  createNewCoil(): void {
    const xmlString = '<coil localId="0" height="20" width="20" negated="false" > \n' +
      '              <position x="0" y="0"/> \n' +
      '              <variable></variable> \n' +
      '              <connectionPointIn> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointIn> \n' +
      '              <connectionPointOut> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointOut> \n' +
      '            </coil> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('coil')[0];
  }
}
