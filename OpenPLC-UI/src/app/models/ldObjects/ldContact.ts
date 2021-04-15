export class LdContact {
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public negated = false;
  public variable = '';
  public position: { x: number, y: number } = {x: 0, y: 0};
  public connectionPointIn: { x: number, y: number, refLocalID: number} = {x: 0, y: 0, refLocalID: 0};
  public connectionPointOut: {x: number, y: number, refLocalID: number} = {x: 0, y: 0, refLocalID: 0};

  constructor(xmlContact: any) {
    if (xmlContact === '') {
      this.createNewContact();
    }
    else {
      this.xml = xmlContact;
      this.localId = xmlContact.getAttribute('localId');
      if (xmlContact.getAttribute('width') !== undefined) {
        this.width = xmlContact.getAttribute('width');
      }
      if (xmlContact.getAttribute('height') !== undefined) {
        this.height = xmlContact.getAttribute('height');
      }
      if (xmlContact.getAttribute('negated') === true) {
        this.negated = true;
      }
      if (xmlContact.getElementsByTagName('variable') !== undefined) {
        this.variable = xmlContact.getElementsByTagName('variable')[0].innerHTML;
      }
      if (xmlContact.getElementsByTagName('position') !== undefined) {
        const position = xmlContact.getElementsByTagName('position')[0];
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if ( xmlContact.getElementsByTagName('connectionPointIn')  !== undefined) {
        const connectionPointIn = xmlContact.getElementsByTagName('connectionPointIn')[0];
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
      if ( xmlContact.getElementsByTagName('connectionPointOut')[0]  !== undefined) {
        const connectionPointOut = xmlContact.getElementsByTagName('connectionPointOut')[0];
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

  createNewContact(): void {
    const xmlString = '<contact localId="0" height="20" width="20" negated="false" > \n' +
      '              <position x="0" y="0"/> \n' +
      '              <variable></variable> \n' +
      '              <connectionPointIn> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointIn> \n' +
      '              <connectionPointOut> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointOut> \n' +
      '            </contact> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('contact')[0];
  }
}
