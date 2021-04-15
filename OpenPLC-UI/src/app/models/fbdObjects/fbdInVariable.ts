export class FbdInVariable {
  public xml: any;
  public name = '';
  public localId: number;
  public height = 20;
  public width = 20;
  public negated = false;
  public position: {x: number, y: number} = {x: 0, y: 0};
  public connectionPointOut: {x: number, y: number, refLocalID: number} = {x: 0, y: 0, refLocalID: 0};

  constructor(xmlInVariable: any) {
    if (xmlInVariable === '') {
      this.createNewInVariable();
    }
    else {
      this.xml = xmlInVariable;
      if (xmlInVariable.getElementsByTagName('expression') !== undefined) {
        this.name = xmlInVariable.getElementsByTagName('expression')[0].innerHTML;
      }
      this.localId = xmlInVariable.getAttribute('localId');
      if (xmlInVariable.getAttribute('width') !== undefined) {
        this.width = xmlInVariable.getAttribute('width');
      }
      if (xmlInVariable.getAttribute('height') !== undefined) {
        this.height = xmlInVariable.getAttribute('height');
      }
      if (xmlInVariable.getAttribute('negated') === true) {
        this.negated = xmlInVariable.getAttribute('negated');
      }
      if (xmlInVariable.getElementsByTagName('position') !== undefined) {
        const position = xmlInVariable.getElementsByTagName('position')[0];
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if ( xmlInVariable.getElementsByTagName('connectionPointOut')[0]  !== undefined) {
        const connectionPointOut = xmlInVariable.getElementsByTagName('connectionPointOut')[0];
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

  createNewInVariable(): void {
    const xmlString = '<inVariable localId="0" height="20" width="20" negated="false" > \n' +
      '              <position x="0" y="0"/> \n' +
      '              <connectionPointOut> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointOut> \n' +
      '            </inVariable> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('inVariable')[0];
  }
}
